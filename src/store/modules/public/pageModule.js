//import store from '../index.js';
import Vue from 'vue';
const state = {
	hasMorePage: false,
    currentName: '',
	pages: {}
};

const mutations = {
	'CHANGE_PAGE': ( state, params ) => {
		switch( state.currentName ){
			case 'list':
				params.store.commit( 'CHANGE_LIST_PAGE', params.page );
				break;
		}
	}
};

const actions = {
	'CHANGE_PAGE': (store, num) => {
		store.commit( 'CHANGE_PAGE', {page: num, store: store });
	}
};

const initModule = {
    state,
    mutations,
    actions
};
export default initModule;