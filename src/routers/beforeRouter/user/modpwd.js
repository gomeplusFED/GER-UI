/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, to)=>{
	
	store.state.pageModule.currentName = to.name;
	let modPwdModule = store.state.modPwd;
	modPwdModule.info = {
		name: to.query.uname,
    	pwd: '',
    	rpwd: ''
   	};
};