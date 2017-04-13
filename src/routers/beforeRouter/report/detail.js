/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
export default (Vue, obj)=>{
	let reportDetail = store.state.reportDetail;
	reportDetail.isMapShow = false;
	reportDetail.isMapError = false;
	Vue.http.post('/report/getDetail', {
		index: obj.query.index,
		id: obj.query.id
	}).then(result=>{
		let lists = result.body.data;
		reportDetail.message = lists.message;
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