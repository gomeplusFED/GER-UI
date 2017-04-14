/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
import Utils from '../../../plugin';
export default (Vue, obj)=>{
    let query = obj.query;
    let local = query.href;
    let page = query.page || 1;
    let reportList = store.state.reportList;
    reportList.selectType = 'message.msg.raw';
    reportList.searchKey = '';
    reportList.searchCount = 0;
    reportList.local = local;
    reportList.query = obj.query;
    Vue.http.post('/report/list', {
        pageNum: page,
        local: local,
        lastDays: reportList.selectDay
    }).then(result=>{
        let rBody = result.body;
        if( rBody.code === 200 ){
            let lists = rBody.data.results;
            reportList.lists = lists;
            reportList.buckets = rBody.data.buckets;
            reportList.pages = rBody.data.page;
            if(reportList.pages.pages < page){
                let reg = new RegExp('page=\\d+');
                let href = window.location.href.replace(reg, 'days='+ reportList.selectDay +'&page=' + reportList.pages.pages);
                window.location.href = href;
            }
            reportList.total = rBody.data.total;
            if( lists.length === 0 ){
                reportList.listNormal = true;
            }
            reportList.hasMorePage = reportList.pages.pages > 1;
            // store.commit('SEARCH_ECHAR', store);
        }else{
            reportList.isError = true;
        }
        reportList.loading = false;
    },()=>{
        reportList.isError = true;
        reportList.loading = false;
    });

    Vue.http.post('/report/getForms', {
        local: local,
        lastDays: store.state.reportList.selectDay,
        forms: 'forms'
    }).then(result=>{
        let rBody = result.body;
        if( rBody.code === 200 ){
            let arr = rBody.data.aggregations.forms.buckets;
            reportList.dateList = Utils.getCharData(store.state.reportList.selectDay, arr).keys;
            reportList.categoriesArr = Utils.getCharData(store.state.reportList.selectDay, arr).values;
            store.commit('SEARCH_ECHAR', store);
        }else{
            reportList.isFormError = true;
        }
        reportList.formLoading = false;
    },()=>{
        reportList.isFormError = true;
        reportList.formLoading = false;
    });
};
