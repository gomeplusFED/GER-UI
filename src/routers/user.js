/**
 * @author zhaodonghong
 * @fileoverview routers user.js
 * @date 2017/02/27
 */
import stroe from '../store';
import user from '../pages/user/list.vue';
import add from '../pages/user/add.vue';
import edit from '../pages/user/edit.vue';
import modpwd from '../pages/user/modpwd.vue';
export default  [
	{
		path: '/index',
		// component: index,
		redirect: () => {
			if(!stroe.state.initModule.isAdmin){
				return '/report';
			}else{
				return '/user'
			}
	    }
	},
	{
		path: '/user', 
		component: user,
		name: 'user'
	},
	{
		path: '/user/edit', 
		component: edit,
		name: 'edit'
	},
	{
		path: '/user/add', 
		component: add,
		name: 'add'
	},
	{
		path: '/user/modpwd', 
		component: modpwd,
		name: 'modpwd'/*,
		redirect: () => {
			console.log(modpwd)
		}*/
	}
];