

const state = {
    lists: {},
    isError: false,
    loading: true
};

const mutations = {
    'REPORT_REGET': () => {
     	window.location.reload();
    }
};

const actions = {
    'REPORT_REGET': (store)=>{
    	store.commit( 'REPORT_REGET');
    }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;