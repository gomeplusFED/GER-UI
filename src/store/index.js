import Vue from 'vue';
import Vuex from 'vuex';
import initModule from './modules/initModule';
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		initModule: initModule
	}
});