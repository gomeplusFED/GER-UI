

const state = {
    lists:{},
    buckets: {},
    page: {},
    local: '',
    hasMorePage: false,
    listNormal: false,
    isError: false,
    loading: true,
    selectDays: '1',
    selectTypes: '1',
    
};

const mutations = {
    /*'REPORT_REGET': () => {
     	window.location.reload();
    }*/
};

const actions = {
    /*'REPORT_REGET': (store)=>{
    	store.commit( 'REPORT_REGET');
    }*/
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;