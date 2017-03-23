/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
export default (Vue, obj)=>{
	let pageNum = obj.query.page ? obj.query.page : 0;
	Vue.http.get('/report/getAll', {
		page: pageNum
	}).then(function(data ){
		if(data.body.flag){
			let reportList = store.state.report; 
			reportList.list = data.body.buckets;
			// console.log(data.body.buckets);
		}
	}, function(response){
		console.log(JSON.stringify(response));
	});
};