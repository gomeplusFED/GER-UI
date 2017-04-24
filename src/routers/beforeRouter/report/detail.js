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
			"浏览器名称": ua.browser.name,
			"浏览器内核": ua.engine.name,
			"操作系统": ua.os.name
		};
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