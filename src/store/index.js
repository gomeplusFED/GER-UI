import Vue from 'vue';
import Vuex from 'vuex';
import initModule from './modules/initModule';
import userList from './modules/user/list';
import userInfo from './modules/user/edit';
import modPwd from './modules/user/modPwd';
import report from './modules/report/report';
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		
		initModule: initModule,
		userList: userList,
		userInfo: userInfo,
		modPwd: modPwd,
		report: report
	}
});