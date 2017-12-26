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
          if(lastDays <= 31){
            renderCHARTS(splitDataByDomain(body.data));
          } else if(lastDays === 90){
            // 近三个月，三个点合并为一个点显示
            renderCHARTS(mergeData(splitDataByDomain(body.data), 3), 3);
          } else if(lastDays === 180){
            // 近半年，6个点合并为一个显示
            renderCHARTS(mergeData(splitDataByDomain(body.data), 6), 6);
          }
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

function mergeData(chartsData, mergeLen){
  // 分别合并每个域名的数据
  chartsData.data.forEach(function (domain) {
    const domainData = domain.data;
    const mergedData = [];
    // 按照合并长度mergeLen合并数据
    for(let i = 0, len = domainData.length; i < len; i += mergeLen){
      mergedData.push(mergeDataByLen(domainData, i, mergeLen));
    }
    // 保存合并后的数据
    domain.data = mergedData;
  });
  // 按照合并长度mergeLen合并横坐标
  const mergedXAis = [];
  for(let i = 0, len = chartsData.xAxis.length; i < len; i += mergeLen){
    mergedXAis.push(chartsData.xAxis[i]);
  }
  chartsData.xAxis = mergedXAis;

  return chartsData;
}

function mergeDataByLen(data, index ,length) {
  let result = null;
  // 将length长度内的数据合并
  for(let i = 0; i < length && (index + i) < data.length; i++){
    // 当前数据是否为null
    if(data[index + i]){
      result = result || {};
      // 遍历每一项内的所有数据，合并
      for(let key in data[index + i]){
        if(result[key]){
          result[key] += data[index + i][key]
        } else {
          result[key] = data[index + i][key]
        }
      }
    }
  }
  return result;
}

function renderCHARTS(data, dayRange){
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
          return tranformDate(this.x, dayRange) + '<br/>'
            + this.series.name + ':' + this.y + '<br/>'
            + tooltip.join('<br/>');
        }
      },
      series: data.data
    };
    window.chart = new Highcharts.Chart('report_summary_container', options);
}

const nowDate = new Date();
nowDate.setDate(nowDate.getDate() - 1); // 数据只会统计到当前天的前一天
const nowTime = nowDate.getTime();
function tranformDate(dateString, dayRange) {
  const result = dateString.replace(/-/g,  '.');
  if(!dayRange){
    return result;
  }
  // 显示为时间范围
  const dateArr = dateString.split('-');
  let date = new Date(dateArr[0], dateArr[1] - 1,  dateArr[2]);
  date.setDate(date.getDate() + dayRange - 1)
  if(date.getTime() > nowTime) date = nowDate;
  return result + '~' + date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
}