
import Vue from  'vue';
import Highcharts from  'highcharts/highstock';
const state = {
    lists:{},
    buckets: {},
    page: {},
    local: '',
    hasMorePage: false,
    listNormal: false,
    isError: false,
    loading: true,
    selectDay: 7,
    selectType: 'message.msg.raw',
    selectTypes: ['message.msg.raw', 'message.currentUrl', 'message.targetUrl'],
    searchKey: '',
    searchCount: 0
};
const mutations = {
    'REPORT_REGET': () => {
        window.location.reload();
    },
    'CHNAGE_DAY': ( state, e ) => {
        state.selectDay = e.target.selectedIndex + 1;
        state.searchCount ++;
    },
    'CHNAGE_TYPE': (state, e) => {
        state.selectType = state.selectTypes[e.target.selectedIndex];
    },
    'SEARCH_KEY': (state, e) => {
        state.searchKey = e.target.value;
        state.searchCount ++;
    },
    'SEARCH_ECHAR': state => {
        let isCurrentDay = state.selectDay;
        let title = '';
        let categoriesArr = [];
        let dataList = [];
        if(isCurrentDay > 1){
            // 15天内 ////
            title = '15天内数据';
            console.log('15天内数据');
            let arr = [];
            let dateObj = {};
            state.lists.forEach(v=>{
                arr.push(v._source.request_time.split(' ')[0]);
            });
            arr.forEach(v => {
                dateObj[v] ? dateObj[v] ++ : dateObj[v] = 1;
            });
            for(var name in dateObj){
                dataList.push(name);
                categoriesArr.push(dateObj[name]);
            }
        }else{
            // 1天内
            console.log('当天数据当天数据');
            title = '当天数据';
            let arr = [];
            let dateObj = {};
            state.lists.forEach(v=>{
                arr.push(v._source.request_time.split(' ')[1].substring(0, 2));
            });
            arr.forEach(v => {
                dateObj[v] ? dateObj[v] ++ : dateObj[v] = 1;
            });
            for(var name in dateObj){
                dataList.push(toDou(parseInt(name)) + ':00');
                categoriesArr.push(parseInt(dateObj[name]));
            }
        }
        function toDou(n){
            return n > 9 ? ' ' + n : ' 0' + n;
        }
        let options =   {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: title
                            },/*
                            subtitle: {
                                text: '小标题'
                            },*/
                            xAxis: {
                                categories: dataList
                            },
                            yAxis: {
                                title: {
                                    text: 'count'
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
                                data: categoriesArr
                            }]
                        };
        let obj = document.getElementsByClassName('report-charbox')[0];
        obj.id = 'container';
        obj.style.height = '200px';
        var chart = new Highcharts.Chart('container', options);
    },
    'SEARCH': (state, store) => {
        if( state.searchCount > 0 ){
            state.isFirstSearch = false;
            let searchData = {
                type: state.selectType,
                keyWord: state.searchKey,
                lastDays: state.selectDay,
                pageNum: state.query.page || 1,
                local: state.query.href
            };

            store.commit('SEARCH_BODY', searchData);
        }
        
    },
    'ORDER_TIME': (state, store) => {
        
        let searchData = {
            type: state.selectType,
            keyWord: state.searchKey,
            lastDays: state.selectDay,
            pageNum: state.query.page || 1,
            local: state.query.href,
            order: 'time'
        };

        store.commit('SEARCH_BODY', searchData);
    },
    'ORDER_TYPE': (state, store) => {

        let searchData = {
            type: state.selectType,
            keyWord: state.searchKey,
            lastDays: state.selectDay,
            pageNum: state.query.page || 1,
            local: state.query.href,
            order: 'type'
        };

        store.commit('SEARCH_BODY', searchData);
    },
    'SEARCH_BODY':(state, searchData) => {

        state.loading = true;
        Vue.http.post('/report/list', searchData ).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let lists = rBody.data.results;
                state.lists = lists;
                state.buckets = rBody.data.buckets;
                state.pages = rBody.data.page;
                state.listNormal = (lists.length === 0);
                state.hasMorePage = rBody.data.page.pages > 1;
            }else{
                state.isError = true;
            }
            state.loading = false;
        },()=>{
            state.isError = true;
            state.loading = false;
        });
    }
};

const actions = {
    'REPORT_REGET': store =>{
        store.commit( 'REPORT_REGET');
    },
    'CHNAGE_DAY': (store, e) => {
        store.commit('CHNAGE_DAY', e);
    },
    'CHNAGE_TYPE': (store, e) => {
        store.commit('CHNAGE_TYPE', e);
    },
    'SEARCH': store => {
        store.commit('SEARCH', store);
    },
    'SEARCH_KEY': (store, e) => {
        store.commit('SEARCH_KEY', e);
    },
    'ORDER_TIME': store =>{
        store.commit('ORDER_TIME', store);
    },
    'ORDER_TYPE': store =>{
        store.commit('ORDER_TYPE', store);
    }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;
