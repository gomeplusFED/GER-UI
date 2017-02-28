//import store from '../index.js';

const state = {
    character: GLOBAL_CONFIG.character
};

const mutations = {
    /*GET_USER_NAME: ( state, data ) => {

        if( state.talkName[data.item.shopId] === undefined ){
            state.talkName[data.item.shopId] = {
                name: data.item.name
            }
        }
    }*/
};

const actions = {
    /*'GET_USER_NAME': ( store, data ) => {
    	store.commit( 'GET_USER_NAME', data );

    }*/
};


const contentTitleModule = {
    state,
    mutations,
    actions
};
export default contentTitleModule;

const state = {
    character: GLOBAL_CONFIG.character,
    test: '1111111',
    test1: '我是 test1'
};

const mutations = {
    EDIT_TEST: ( state) => {
     	state.test = '234242242343';
    },
    EDIT_TEST1: (state) => {
    	state.test1 = '我是test1';
    }
};

const actions = {
    EDIT_TEST: (store)=>{
    	store.commit( 'EDIT_TEST');
    },
    EDIT_TEST1: (store) => {
    	store.commit('EDIT_TEST1');
    }
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;