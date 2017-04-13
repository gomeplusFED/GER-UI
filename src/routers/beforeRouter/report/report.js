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
	let watchUrls = store.state.initModule.watchUrl.split('^');
	//页数
	let pages = Math.ceil(watchUrls / size);
	//监听列表
	let watchUrl = watchUrls.slice((pageNum-1)*size, size * pageNum);
	//store module
	let reportModule =  store.state.report;
	Vue.http.post('/report/getAll', {
		page: pageNum,
		watchUrl: watchUrl,
		size: size
	}).then(function(data ){
		let result = data.body;
		if( result.code === 200 ){
			reportModule.pages = pages;
			reportModule.hasMorePage = pages > 1;
			reportModule.list = result.data;
		}else{
			reportModule.isError = true;
		}

		reportModule.loading = false;
	}, () => {

		reportModule.loading = false;
		reportModule.isError = true;
	});

};