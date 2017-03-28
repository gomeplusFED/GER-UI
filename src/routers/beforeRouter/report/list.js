/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

export default (Vue, obj)=>{
	console.log(Vue, obj);
	/*let pageNum = obj.query.page ? obj.query.page : 0;
	Vue.http.get('/report/getAll', {
		page: pageNum
	}).then(function(response ){
		let lists = response.data.data;
		let userListModule = store.state.userList; 
		userListModule.list = lists; 
		userListModule.isEmpty = !lists.length;
		userListModule.hasMorePage = lists.length > 20;
		userListModule.loading = false;
		
	}, function(){
		console.log(arguments)；
	});*/
};