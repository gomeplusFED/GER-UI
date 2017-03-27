//import store from '../index.js';

const state = {
	superName: GLOBAL_CONFIG.superName,
    isAdmin: GLOBAL_CONFIG.isAdmin,
    userName: GLOBAL_CONFIG.userName,
    watchUrl: GLOBAL_CONFIG.watchUrl,
    isReaded: GLOBAL_CONFIG.isReaded
};

const mutations = {
};

const actions = {
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;