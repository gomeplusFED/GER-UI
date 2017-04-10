/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
export default (Vue, obj)=>{
	let reportDetail = store.state.reportDetail;
	Vue.http.post('/report/getDetail', {
		index: obj.query.index,
		id: obj.query.id
	}).then(result=>{
		let lists = result.body.data;
		for(  let list in lists.message ){
			if (lists.message.hasOwnProperty(list)) {
				lists['message.' + list] = lists.message[list];
			}
		}
		if( lists.ext ){
			for(  let list in lists.ext ){
				if (lists.ext.hasOwnProperty(list)) {
					lists['ext.' + list] = lists.ext[list];
				}
			}
			delete lists.ext;
		}
		delete lists.message;
		reportDetail.lists = lists;
		reportDetail.loading = false;
	},()=>{
		reportDetail.loading = false;
		reportDetail.isError = true;
	});
};