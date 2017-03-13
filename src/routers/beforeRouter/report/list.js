/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

export default (Vue, obj)=>{
	let pageNum = obj.query.page ? obj.query.page : 0;
	Vue.http.get('/report/getAll', {
		page: pageNum
	}).then(function(response ){
		console.log(response )
	}, function(){
		console.log(arguments)
	});
};