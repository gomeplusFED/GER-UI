/**
 * @author zhaodonghong
 * @fileoverview routers report.js
 * @date 2017/02/27
 */

import report from '../pages/report/report.vue';
import detail from '../pages/report/detail.vue';
export default  [
	{
		path: '/report', 
		component: report,
		name: 'report'
	},
	{
		path: '/report/list',
		component: report,
		name: 'list'
	},
	{
		path: '/report/detail',
		component: detail,
		name:'reportDetail'
	}
];