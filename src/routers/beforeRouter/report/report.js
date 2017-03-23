/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';

export default (Vue, obj)=>{
	let pageNum = obj.query.page ? obj.query.page : 1;
	/*Vue.http.get('/report/getAll', {
		page: pageNum
	}).then(function(response ){
		console.log(response )
	}, function(response){
		console.log(JSON.stringify(response));
	});*/
	let watchUrl = store.state.initModule.watchUrl.split('^').slice((pageNum-1)*20, 20 * pageNum); 
	console.log(watchUrl);

};