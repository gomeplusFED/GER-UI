import Vue from  'vue';
import Highcharts from  'highcharts/highstock';

const state = {
  isLoading: true,
  noData: false,
  isError: false
};

const mutations = {
  'LOADING': state => {
    state.noData = false;
    state.isError = false;
    state.isLoading = true;
  },
  'LOADED': state => {
    state.isLoading = false;
  },
  'NO_DATA': state => {
    state.noData = true;
  },
  'ERROR': state => {
    state.isError = true;
  },
};

const actions = {
  RENDER_CHARTS: ({ commit }, lastDays)=>{
    commit('LOADING');
    Vue.http.post('/reportSummary/getSummary', { lastDays })
      .then((res)=>{
      commit('LOADED');
      const body = res.body;
      if(body.code === 200){
        if(body.data.length === 0){
          commit('NO_DATA');
        } else {
          renderCHARTS(splitDataByDomain(body.data));
        }
      } else {
        commit('ERROR');
      }
    });
  }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;

function splitDataByDomain(data) {
  // domainObj用于保存所有域名下的报错信息
  const domainObj = {};
  // dateArr用于保存所有日期
  const dateArr = [];
  data.forEach((dayData)=>{
    dateArr.push(dayData.date);
    dayData.domain_data.forEach((domainData)=>{
      // 以域名作为键值保存数据
      // （这里用对象保存，方便fixData函数判断）
      domainObj[domainData.key] = domainObj[domainData.key] || {};

      const curDomain = {};
      // 保存当天报错信息
      curDomain.y = domainData.doc_count;
      // 保存各个终端下的报错数据
      domainData.buckets.forEach((bucket)=>{
        curDomain[bucket.key] = bucket.doc_count
      });

      // 以日期作为key将当天数据保存到当前域名的数据集合
      domainObj[domainData.key][dayData.date] = curDomain;
    })
  });
  return {
    xAxis: dateArr,
    data: fixData(dateArr, domainObj)
  };
}

// 如果某域名某天没有数据，将其置为null
function fixData(dateArr, domainObj) {
  const result = [];
  // 遍历的所有域名的信息
  for(let domain in domainObj){
    const domainArrData = [];
    // 遍历所有日期，判断当前域名当天的数据是否为空，并补齐为null
    dateArr.forEach((day)=>{
      // 最终按照日期的顺序，将域名数据保存在数组中
      if(domainObj[domain][day]){
        domainArrData.push(domainObj[domain][day]);
      } else {
        domainArrData.push(null);
      }
    });
    result.push({
      name: domain,
      data: domainArrData
    });
  }
  return result;
}

function renderCHARTS(data){
    let options =   {
        chart: {
            type: 'line'
        },
        title: {
            text: '错误汇总'
        },/*
        subtitle: {
            text: '小标题'
        },*/
        xAxis: {
            categories: data.xAxis
        },
        yAxis: {
            min: 0,
            title: {
                text: '错误个数'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true          // 开启数据标签
                },
                enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            }
        },
      tooltip: {
        formatter: function () {
          const options = this.point.options;
          const tooltip = [];
          if(options.pc) tooltip.push('pc:' + options.pc);
          if(options.mobile) tooltip.push('mobile:' + options.mobile);
          return this.x + '<br/>'
            + this.series.name + ':' + this.y + '<br/>'
            + tooltip.join('<br/>');
        }
      },
      series: data.data
    };
    window.chart = new Highcharts.Chart('report_summary_container', options);
}