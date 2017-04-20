/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, to)=>{
	
	store.state.pageModule.currentName = to.name;
	let userInfoModule = store.state.userInfo;
	let initModule = store.state.initModule;
	userInfoModule.userInfo = {
		name: '',
    	pwd: '',
    	rpwd: '',
    	watchUrl: ''
	};
	userInfoModule.userInfo.name = to.query.uname || '';
	userInfoModule.userInfo.type = to.query.type;
	if( to.query.uname ){
		Vue.http.post('/user/getUserInfo', {
			superName: initModule.superName,
			userName: to.query.uname
		}).then(function(response ){
			if( response.body.code === 200 ){
				userInfoModule.userInfo.pwd =  response.data.data.password;
				userInfoModule.userInfo.rpwd =  response.data.data.password;
				userInfoModule.userInfo.watchUrl =  response.data.data.watchUrl;
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
			console.log(arguments);
		});
	}
};