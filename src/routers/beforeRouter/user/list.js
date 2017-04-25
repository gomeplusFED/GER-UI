/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, to)=>{
	
	store.state.pageModule.currentName = to.name;
	Vue.http.post('/user/getlist', {
		superName: store.state.initModule.superName,
		pageNum: to.query.page || 1
	}).then(function(response ){
		let lists = response.data.data;
    	let pageModule = store.state.pageModule;
		let userListModule = store.state.userList; 
		userListModule.list = lists; 
		userListModule.isEmpty = !lists.length;
		userListModule.loading = false;
		pageModule.pages = response.data.page;
		pageModule.hasMorePage = response.data.page.pages;
	}, function(){
		console.log(arguments);
	});
};