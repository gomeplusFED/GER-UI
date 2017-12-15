/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/02/27
 */

import report from './report/report';
import list from './report/list';
import reportDetail from './report/detail';
import user from './user/list';
import edit from './user/edit';
import modPwd from './user/modpwd';
import reportSummary from './reportSummary/reportSummary';
export default  {
	report: report,
	list: list,
	reportDetail: reportDetail,
	user: user,
	edit: edit,
	add: edit,
	modpwd: modPwd,
  reportSummary: reportSummary
};