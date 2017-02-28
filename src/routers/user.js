/**
 * @author zhaodonghong
 * @fileoverview routers user.js
 * @date 2017/02/27
 */
import stroe from '../store';
import index from '../pages/user/list.vue';
import add from '../pages/user/add.vue';
import edit from '../pages/user/edit.vue';
import modpwd from '../pages/user/modpwd.vue';
export default  [
	{
		path: '/index', 
		component: index
	},
	{
		path: '/index/:id', 
		component: index 
	},
	{
		path: '/user/edit/:name', 
		component: edit 
	},
	{
		path: '/user/add', 
		component: add 
	},
	{
		path: '/user/modpwd/:name', 
		component: modpwd 
	}
];