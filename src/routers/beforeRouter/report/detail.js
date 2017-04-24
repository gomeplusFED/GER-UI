/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
import parser from 'ua-parser-js';

export default (Vue, to)=>{
	let reportDetail = store.state.reportDetail;
	store.state.pageModule.currentName = to.name;
	reportDetail.isMapShow = false;
	reportDetail.isMapError = false;
	Vue.http.post('/report/getDetail', {
		index: to.query.index,
		id: to.query.id
	}).then(result=>{
		let lists = result.body.data;
		let ua = parser(lists.message.userAgent);
		console.log(ua);
		reportDetail.message = lists.message;
		reportDetail.message.uaDetail = {
			"uaName": ua.browser.name,
			"uaWebkit": ua.engine.name,
			"os": ua.os.name,
			"device": ua.device.name || '--'
		};
		/*reportDetail.message.ua.uaName = ua.browser.name;
		reportDetail.message.ua.uaWebkit = ua.engine.name;
		reportDetail.message.ua.os = ua.os.name;
		reportDetail.message.ua.device = ua.device.name || '';*/


		reportDetail.ext = lists.ext;
		delete lists.message;
		delete lists.ext;
		reportDetail.lists = lists;
		reportDetail.loading = false;
	},()=>{
		reportDetail.loading = false;
		reportDetail.isError = true;
	});
};