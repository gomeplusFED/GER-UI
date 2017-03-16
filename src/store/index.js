import Vue from 'vue';
import Vuex from 'vuex';
import initModule from './modules/initModule';
import userList from './modules/user/list';
import userInfo from './modules/user/edit';
import modPwd from './modules/user/modPwd';
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		
		initModule: initModule,
		userList: userList,
		userInfo: userInfo,
		modPwd: modPwd
	}
});