import Vue from  'vue';
import Highcharts from  'highcharts/highstock';
import data from './fakeData'
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
      const body = data;
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
  // 保存所有域名的报错信息
  const domainObj = {};
  // 保存所有日期前
  const dateArr = [];
  data.forEach((dayData)=>{
    dateArr.push(dayData._source.date);
    dayData._source.count.forEach((domain)=>{
      const curDomain = {};
      // 保存日期
      curDomain.date = dayData._source.date;
      // 保存当天数据
      curDomain.count = domain.doc_count;
      // 分别保存终端数据
      curDomain.terminal = {};
      domain.projectType.buckets.forEach((bucket)=>{
        curDomain.terminal[bucket.key] = bucket.doc_count
      });
      // 以域名作为键值保存数据，以数组的形式保存
      domainObj[domain.key] = domainObj[domain.key] || {};
      // 以日期作为key将当天数据保存到当前域名的数据集合
      domainObj[domain.key][curDomain.date] = curDomain;
    })
  });
  return {
    xAxis: dateArr.reverse(),
    data: fixData(dateArr, domainObj).reverse()
  };
}

// 如果某域名某天没有数据，将其置为null
function fixData(dateArr, domainObj) {
  const result = [];
  for(let domain in domainObj){
    const domainArr = [];
    dateArr.forEach((day)=>{
      // domainObj[domain][day] = domainObj[domain][day] || null;
      // 最终按日期顺序，以数组形式保存数据
      if(domainObj[domain][day]){
        domainArr.push({
          y: domainObj[domain][day].count,
          pc: domainObj[domain][day].terminal.pc,
          mobile: domainObj[domain][day].terminal.mobile
        });
      } else {
        domainArr.push(null);
      }
    });
    result.push({
      name: domain,
      data: domainArr
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