/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, obj)=>{
	let userInfoModule = store.state.userInfo;
	userInfoModule.type = obj.query.uname ? 'edit' : 'add';
	userInfoModule.userInfo.name = obj.query.uname || '';
	if( obj.query.uname ){
		Vue.http.post('/user/getUserInfo', {
			superName: GLOBAL_CONFIG.userName,
			userName: obj.query.uname
		}).then(function(response ){
			if( response.body.code === 200 ){
				userInfoModule.userInfo.pwd =  response.body.pwd;
				userInfoModule.userInfo.rpwd =  response.body.pwd;
				userInfoModule.userInfo.watchUrl =  response.body.watchUrl;
				userInfoModule.hasUser = true;
			}else{
				let timer = setInterval(()=>{
					userInfoModule.second --;
					if( userInfoModule.second === 0 ){
						clearInterval(timer);
						window.location.href = '/user';
					}
				}, 1000);
			}
			userInfoModule.loading = false;
		}, function(){
			console.log(arguments)
		});
	}
};