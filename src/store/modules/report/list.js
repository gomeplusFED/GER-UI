
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
    selectDay: 1,
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
        // state.selectDay = 2;
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
        let dataArr = state.lists;
        let categoriesArr;
        let dataList;
        let buckets = state.buckets;
        dataArr.forEach(v=>{
            let oDate = new Date(parseInt(v._source.message.timestamp));
            console.log(oDate.getFullYear() + '' + (oDate.getMonth()+1) + '' + oDate.getDate());
        });
        if(isCurrentDay > 1){
            // 15天内
            categoriesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
            title = '15天内数据';
            dataList = [7, 6, 9, 14, 1, 3, 8, 2, 1, 1, 1, 9,12,12,2];
            
            console.log('15天内数据');

        }else{
            // 1天内
            console.log('当天数据当天数据');
            categoriesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            title = '当天数据';
            dataList = [7, 6, 9, 14, 1, 3, 8, 2, 1, 1, 1, 9, 7, 6, 9, 14, 1, 3, 8, 2, 1, 1, 1, 9];
        }
        // buckets.keys();
        /*let str = i>9?' ':' 0';
        let i = 0;
        let size = 0;
        state.lists.forEach(v=>{
            if(v._source.reqest_time.indexOf(str+i)){
                size++;
                arr[i] = size;
            }
        });*/
        console.log(categoriesArr, dataList);
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
                                categories: categoriesArr
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
                                data: dataList
                            }]
                        };
        // console.log(highcharts);
        let obj = document.getElementsByClassName('report-charbox')[0];
        obj.id = 'container';
        // obj.style.minWidth = '800px';
        obj.style.height = '200px';
        var chart = new Highcharts.Chart('container', options);
        // document.getElementsByClassName('ger-loading')[0].remove();
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
        //store.commit('test');
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