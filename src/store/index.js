import Vue from 'vue';
import Vuex from 'vuex';
import initModule from './modules/initModule';
import userList from './modules/user/userList';
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		initModule: initModule,
		userList: userList
	}
});