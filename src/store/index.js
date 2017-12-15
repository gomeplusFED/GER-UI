import Vue from 'vue';
import Vuex from 'vuex';
import initModule from './modules/public/initModule';
import pageModule from './modules/public/pageModule';
import userList from './modules/user/list';
import userInfo from './modules/user/edit';
import modPwd from './modules/user/modPwd';
import report from './modules/report/report';
import reportList from './modules/report/list';
import reportDetail from './modules/report/detail';
import reportSummary from './modules/reportSummary/reportSummary';
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		initModule: initModule,
		userList: userList,
		userInfo: userInfo,
		modPwd: modPwd,
		report: report,
		reportList: reportList,
		reportDetail: reportDetail,
		pageModule: pageModule,
		reportSummary: reportSummary
	}
});