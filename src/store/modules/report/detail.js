

const state = {
    lists: {},
    isError: false,
    loading: true,
    message: {},
    ext: {},
    messageKeys: ['msg', 'targetUrl', 'rolNum', 'colNum', 'title', 'host', 'currentUrl', 'referer', 'projectType', 'screenSize', 'flashVer', 'userAgent', 'log_master']
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