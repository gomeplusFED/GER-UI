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