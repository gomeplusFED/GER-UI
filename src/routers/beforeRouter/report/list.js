/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
export default (Vue, obj)=>{
	let query = obj.query;
	let local = query.href;
	let page = query.page || 1;
	let reportList = store.state.reportList;
	reportList.query = obj.query;
	Vue.http.post('/report/list', {
		pageNum: page,
		local: local
	}).then(result=>{
		let rBody = result.body;
		if( rBody.code === 200 ){
			let lists = rBody.data.results;
			reportList.lists = lists;
			reportList.buckets = rBody.data.buckets;
			reportList.pages = rBody.data.page;
			if( lists.length === 0 ){
				reportList.listNormal = true;
			}
			reportList.hasMorePage = rBody.data.page.pages > 1;
			store.commit('SEARCH_ECHAR');
		}else{
			reportList.isError = true;
		}
		
		
	},()=>{
		reportList.isError = true;
	}).catch(()=>{
		reportList.loading = false;
	});
};