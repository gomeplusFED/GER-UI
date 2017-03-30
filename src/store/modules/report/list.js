
import Vue from  'vue';
import echarts from  'echarts';
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
    selectType: '',
    selectTypes: ['message.msg.raw', 'message.currentUrl', 'message.targetUrl'],
    searchKey: ''
};

const mutations = {
    'REPORT_REGET': () => {
     	window.location.reload();
    },
    'CHNAGE_DAY': ( state, e ) => {
        state.selectDay = e.target.selectedIndex + 1;
    },
    'CHNAGE_TYPE': (state, e) => {
        state.selectType = state.selectTypes[e.target.selectedIndex];
    },
    'SEARCH_KEY': (state, e) => {
        state.searchKey = e.target.value;
    },
    'SEARCH_ECHAR': state => {
        console.log(state);

        // let options = {};

        console.log(echarts);
        // echarts.init(document.getElementsByClass('report-charbox')[0]);
        // myChart.setOption(options);
    },
    'SEARCH': state => {
        /*if( selectDay !== 1 || ){

        }*/
        Vue.http.post('/report/list', {
            pageNum: state.query.page,
            local: state.query.href,
        }).then(result=>{
            let rBody = result.body;
            if( rBody.code === 200 ){
                let lists = rBody.data.results;
                state.lists = lists;
                state.buckets = rBody.data.buckets;
                state.pages = rBody.data.page;
                if( lists.length === 0 ){
                    state.listNormal = true;
                }
                state.hasMorePage = rBody.data.page.pages > 1;
            }else{
                state.isError = true;
            }
            
            
        },()=>{

        }).catch(()=>{
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
        store.commit('SEARCH');
    },
    'SEARCH_KEY': (store, e) => {
        store.commit('SEARCH_KEY', e);
    }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;