/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
export default (Vue, obj)=>{
    let query = obj.query;
    let local = query.href;
    let page = query.page || 1;
    let reportList = store.state.reportList;
    reportList.selectDay = 7;
    reportList.selectType = 'message.msg.raw';
    reportList.searchKey = '';
    reportList.searchCount = 0;
    reportList.query = obj.query;
    Vue.http.post('/report/list', {
        pageNum: page,
        local: local,
        lastDays:store.state.reportList.selectDay
    }).then(result=>{
        let rBody = result.body;
        if( rBody.code === 200 ){
            let lists = rBody.data.results;
            reportList.lists = lists;
            reportList.buckets = rBody.data.buckets;
            reportList.pages = rBody.data.page;
            reportList.total = rBody.data.total;
            if( lists.length === 0 ){
                reportList.listNormal = true;
            }
            reportList.hasMorePage = reportList.pages.pages > 1;
            store.commit('SEARCH_ECHAR', store);
        }else{
            reportList.isError = true;
        }
        reportList.loading = false;
        
    },()=>{
        reportList.isError = true;
        reportList.loading = false;
    });
};
