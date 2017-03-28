/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, obj)=>{
	let modPwdModule = store.state.modPwd;
	modPwdModule.info = {
		name: obj.query.uname,
    	pwd: '',
    	rpwd: ''
   	};
};