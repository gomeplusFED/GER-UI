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
      // debugger
      // console.log(2222);
      commit('LOADED');
      // const body = res.body;
      // if(body.code === 200){
      //   if(body.data.length === 0){
      //     commit('NO_DATA');
      //   } else {
      //
      //   }
      // } else {
      //   commit('ERROR');
      // }
    });
  }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;


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
            categories: []
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
        series: [{
            name: 'error length',
            data: data
        }]
    };
    window.chart = new Highcharts.Chart('report_summary_container', options);
}