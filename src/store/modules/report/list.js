
import Vue from  'vue';
import Utils from '../../../plugin';
import Highcharts from  'highcharts/highstock';
const state = {
    lists:{},
    buckets: {},
    pages: {},
    total : 0,
    local: '',
    hasMorePage: false,
    listNormal: false,
    isError: false,
    loading: true,
    selectDay: 7,
    selectType: 'message.msg.raw',
    selectTypes: ['message.msg.raw', 'message.currentUrl', 'message.targetUrl'],
    searchKey: '',
    searchCount: 0,
    oldHref: ''
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
    'SEARCH_ECHAR': (state, store) => {
        let isCurrentDay = state.selectDay;
        let title = '';
        let categoriesArr = [];
        let dataList = [];
        // 记录当前href的值
        state.oldHref = state.query.href;
        if(isCurrentDay > 1){
            title = state.selectDay + '天内数据';
            let arr = [];
            let dateObj = {};
            state.lists.forEach(v=>{
                if(!v._source.request_time)return;
                arr.push(v._source.request_time.split(' ')[0]);
            });
            arr.forEach(v => {
                dateObj[v] ? dateObj[v] ++ : dateObj[v] = 1;
            });
            categoriesArr = Utils.json_sort({
                json : dateObj,
                type :  'days',
                value : 'value'
            });
            dataList = Utils.json_sort({
                json : dateObj,
                type :  'days',
                value : 'key'
            });
            console.log(categoriesArr, dataList);
        }else{
            title = '当天数据';
            let arr = [];
            let dateObj = {};
            state.lists.forEach(v=>{
                if(!v._source.request_time)return;
                arr.push(v._source.request_time.split(' ')[1].substring(0, 2));
            });
            arr.forEach(v => {
                dateObj[v] ? dateObj[v] ++ : dateObj[v] = 1;
            });

            categoriesArr = Utils.json_sort({
                json : dateObj,
                type :  'hours',
                value : 'value'
            });
            dataList = Utils.json_sort({
                json : dateObj,
                type :  'hours',
                value : 'key'
            });
            console.log(categoriesArr, dataList);
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
                                data: categoriesArr
                            }]
                        };
        let obj = document.getElementsByClassName('report-charbox')[0];
        obj.id = 'container';
        obj.style.height = '200px';
        var chart = new Highcharts.Chart('container', options);
    },
    'SEARCH': (state, store) => {
        // if( state.searchCount > 0 ){
        if( true ){
            state.isFirstSearch = false;
            let searchData = {
                type: state.selectType,
                keyWord: state.searchKey,
                lastDays: state.selectDay,
                pageNum: state.query.page || 1,
                local: state.query.href
            };
            store.commit('SEARCH_BODY', {searchData, store});
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

        store.commit('SEARCH_BODY', {searchData, store});
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

        store.commit('SEARCH_BODY', {searchData, store});
    },
    'SEARCH_BODY':(state, options) => {
        state.loading = true;
        Vue.http.post('/report/list', options.searchData ).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let lists = rBody.data.results;
                state.lists = lists;
                state.buckets = rBody.data.buckets;
                state.pages = rBody.data.page;
                state.listNormal = (lists.length === 0);
                state.hasMorePage = rBody.data.page.pages > 1;

                options.store.commit('SEARCH_ECHAR', options.store);
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
