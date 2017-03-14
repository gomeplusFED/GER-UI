/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/02/27
 */

import report from './report/report';
import list from './report/list';
import reportDetail from './report/detail';
import user from './user/list';
export default  {
	report: report,
	list: list,
	reportDetail: reportDetail,
	user: user
};