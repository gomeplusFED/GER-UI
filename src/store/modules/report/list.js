
import Vue from  'vue';
import store from '../../../store';
import Utils from '../../../plugin';
import Highcharts from  'highcharts/highstock';
const state = {
    lists:{},
    buckets: {},
    pages: {},
    total : 0,
    hasMorePage: false,
    listNormal: false,
    isError: false,
    isFormError: false,
    loading: true,
    formLoading: true,
    selectDay: 7,
    selectType: 'message.msg',
    selectTypes: ['message.msg', 'message.currentUrl', 'message.targetUrl'],
    searchKey: '',
    searchCount: 0,
    oldHref: '',
    dateList : [],
    query: {},
    categoriesArr : [],
    orderBy: 'time',
    timeChange: true,
    typeChange: false
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
        let isDays = state.selectDay > 1;
        let title = '';
        let categoriesArr = [];
        let dateList = [];
        // 记录当前href的值
        state.oldHref = state.query.href;
        if(isDays){
            title = state.selectDay + '天内数据';
        }else{
            title = '当天数据';
        }
        categoriesArr = state.categoriesArr;
        dateList = state.dateList;
        if(categoriesArr.length && categoriesArr.length == dateList.length){
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
                                categories: dateList
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
            window.chart = new Highcharts.Chart('container', options);
        }
    },
    'SEARCH': (state, store) => {
        if( state.searchCount > 0 ){
            state.query.page = 1;
            let searchData = {
                type: state.selectType,
                keyWord: state.searchKey,
                lastDays: state.selectDay,
                pageNum: state.query.page,
                local: state.query.href,
                typeDevice: state.query.type
            };
            console.log(state.searchKey);
            store.commit('SEARCH_BODY', {searchData, store});
            store.commit('SEARCH_FORMS', { searchData: {
                lastDays: state.selectDay,
                local: state.query.href,
                forms: 'forms',
                typeDevice: state.query.type
            }, store });
        }
        
    },
    'ORDER_TIME': (state, store) => {
        state.orderBy = 'time';
        state.query.page = 1;
        state.timeChange = true;
        state.typeChange = false;
        let searchData = {
            type: state.selectType,
            keyWord: state.searchKey,
            lastDays: state.selectDay,
            pageNum: state.query.page,
            local: state.query.href,
            order: state.orderBy,
            typeDevice: state.query.type
        };
        store.commit('SEARCH_BODY', {searchData, store});
    },
    'ORDER_TYPE': (state, store) => {

        state.timeChange = false;
        state.typeChange = true;
        state.query.page = 1;
        state.orderBy = 'type';
        let searchData = {
            type: state.selectType,
            keyWord: state.searchKey,
            lastDays: state.selectDay,
            pageNum: state.query.page,
            local: state.query.href,
            order: state.orderBy,
            typeDevice: state.query.type
        };

        store.commit('SEARCH_BODY', {searchData, store});
    },
    'SEARCH_FORMS': (state, options) => {
        Vue.http.post('/report/getForms', options.searchData).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let arr = rBody.data.aggregations.forms.buckets;
                state.dateList = Utils.getCharData(state.selectDay, arr).keys;
                state.categoriesArr = Utils.getCharData(state.selectDay, arr).values;
                options.store.commit('SEARCH_ECHAR', options.store);
            }else{
                state.isFormError = true;
                state.formLoading = false;
            }
        },() => {
            state.isFormError = true;
            state.formLoading = false;
        });
    },
    'SEARCH_BODY':(state, options) => {
        state.loading = true;
        Vue.http.post('/report/list', options.searchData ).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let lists = rBody.data.results;
                let pageModule = store.state.pageModule;
                state.lists = lists;
                state.buckets = rBody.data.buckets;
                state.pages = rBody.data.page;
                pageModule.pages = rBody.data.page;
                pageModule.hasMorePage = pageModule.pages.pages > 1;
                state.listNormal = (lists.length === 0);
                state.hasMorePage = state.pages > 1;
                options.store.commit('SEARCH_ECHAR', options.store);
            }else{
                state.isError = true;
            }
            state.loading = false;
        },()=>{
            state.isError = true;
            state.loading = false;
        });
    },
    'CHANGE_LIST_PAGE': (state, num ) => {
        let search = {
            pageNum: num,
            local: state.oldHref,
            lastDays: state.selectDay,
            typeDevice: state.query.type,
            keyWord: state.searchKey,
            type: state.selectType
        };
        if( state.searchKey === '' ){
            search.order = state.orderBy;
        }
        Vue.http.post('/report/list', search).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let pageModule = store.state.pageModule;
                let lists = rBody.data.results;
                pageModule.pages = rBody.data.page;
                pageModule.hasMorePage = rBody.data.page.pages;
                state.lists = lists;
                state.buckets = rBody.data.buckets;
                state.total = rBody.data.total;
                if( lists.length === 0 ){
                    state.listNormal = true;
                }
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
