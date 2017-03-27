// import store from '../index.js';

const state = {
    list:[],
    hasMorePage: false,
    isEmpty: false,
    loading: true
};

const mutations = {
    /*EDIT_TEST: ( state) => {
     	state.test = '234242242343';
    },
    EDIT_TEST1: (state) => {
    	state.test1 = '我是test1';
    }*/
};

const actions = {
    /*EDIT_TEST: (store)=>{
    	store.commit( 'EDIT_TEST');
    },
    EDIT_TEST1: (store) => {
    	store.commit('EDIT_TEST1');
    }*/
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;