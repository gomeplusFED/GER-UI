/**
 * @author zhaodonghong
 * @fileoverview routers user.js
 * @date 2017/02/27
 */
import stroe from '../../store';
import user from '../../pages/user/list.vue';
import add from '../../pages/user/add.vue';
import edit from '../../pages/user/edit.vue';
import modpwd from '../../pages/user/modpwd.vue';
export default  [
	{
		path: '/index',
		redirect: to => {
			if( to.query.originUrl && to.query.originUrl !== '' ){
				let origin = decodeURIComponent(to.query.originUrl).split('?');
				let redirect = origin[0];
				let params = origin[1].split('&');
				let querys = {};
				params.forEach(v => {
					let query = v.split('=');
					querys[query[0]] = query[1];
				});
				 return { path: redirect, query: querys }
			}else {
				if(stroe.state.initModule.isAdmin){
					return '/user';
				}else{
					return '/report';
				}
			}
	    }
	},
	{
		path: '/user', 
		component: user,
		name: 'user',
		meta: {
			title: '用户列表',
			needCompetence: true
		} 
	},
	{
		path: '/user/edit', 
		component: edit,
		name: 'edit',
		meta: {
			title: '编辑用户',
			needCompetence: true
		} 
	},
	{
		path: '/user/add', 
		component: add,
		name: 'add',
		meta: {
			title: '添加用户',
			needCompetence: true
		} 
	},
	{
		path: '/user/modpwd', 
		component: modpwd,
		name: 'modpwd',
		meta: {
			title: '修改密码'
		} 
	}
];