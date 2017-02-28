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
		component: report 
	},
	{
		path: '/report/:id', 
		component: report 
	},
	{
		path: '/report/:id/detail', 
		component: detail 
	}
];