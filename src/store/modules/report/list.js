
import Vue from  'vue';
//import echarts from  'echarts';
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
        console.log(state);

        // let options = {};

        //console.log(echarts);
        // echarts.init(document.getElementsByClass('report-charbox')[0]);
        // myChart.setOption(options);
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
