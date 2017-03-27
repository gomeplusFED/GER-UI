/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */
import store from '../../../store';
export default (Vue, obj)=>{
	//页码
	let pageNum = obj.query.page ? obj.query.page : 1;
	//每页数据条数
	let size = obj.query.size || 10;
	//store => module
	let reportList = store.state.report; 
	//监听列表
	let watchUrl = store.state.initModule.watchUrl.split('^').slice((pageNum-1)*size, size * pageNum); 
	/*Vue.http.post('/report/getAll', {
		page: pageNum,
		watchUrl: watchUrl,
		size: size
	}).then(function(data ){*/
		/*if(data.body.flag){
			reportList.list = data.body.buckets;
			// console.log(data.body.buckets);
		}*/
		/*console.log(data)
	}, function(response){
		console.log(JSON.stringify(response));
	});*/
	let arr = ['msg=对象不支持“querySelector”属性或方法@'];
	arr.forEach(v=>{

		Vue.http.get('https://www-pre.gomeplus.com/ajax/log/index?err_msg=' + encodeURIComponent(v), {});
	})

	
	console.log(watchUrl);

};