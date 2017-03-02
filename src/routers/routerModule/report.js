/**
 * @author zhaodonghong
 * @fileoverview routers report.js
 * @date 2017/02/27
 */

import report from '../../pages/report/report.vue';
import list from '../../pages/report/list.vue';
import detail from '../../pages/report/detail.vue';
export default  [
	{
		path: '/report', 
		component: report,
		name: 'report',
		meta: {
			title: '错误报告'
		} 
	},
	{
		path: '/report/list',
		component: list,
		name: 'list',
		meta: {
			title: '错误列表'
		} 
	},
	{
		path: '/report/detail',
		component: detail,
		name:'reportDetail',
		meta: {
			title: '错误详情'
		} 
	}
];