/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, obj)=>{
	Vue.http.post('/user/getlist', {
		userName: GLOBAL_CONFIG.userName,
		page: obj.query.page || 1
	}).then(function(response ){
		let lists = response.data;
		let userListModule = store.state.userList; 
		userListModule.list = lists; 
		userListModule.isEmpty = !lists.length;
		userListModule.hasMorePage = lists.length > 20;
		userListModule.loading = false;
	}, function(){
		console.log(arguments)
	});
};