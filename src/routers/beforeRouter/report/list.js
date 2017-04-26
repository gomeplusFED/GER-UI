/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/03/1
 */

import store from '../../../store';
import Utils from '../../../plugin';
export default (Vue, to, from)=>{
    store.state.pageModule.currentName = to.name;
    let query = to.query;
    let local = query.href;
    let typeDevice = query.type || 'all';
    let page = query.page || 1;
    let reportList = store.state.reportList;
    let pageModule = store.state.pageModule;
    if( to.name !== from.name ){
        reportList.selectType = 'message.msg.raw';
        reportList.searchKey = '';
        reportList.searchCount = 0;
    }
    
    reportList.query = to.query;
    Vue.http.post('/report/list', {
        pageNum: page,
        local: local,
        lastDays: reportList.selectDay,
        typeDevice: typeDevice
    }).then(result=>{
        let rBody = result.body;
        if( rBody.code === 200 ){
            let lists = rBody.data.results;
            pageModule.pages = rBody.data.page;
            pageModule.hasMorePage = rBody.data.page.pages;
            reportList.lists = lists;
            reportList.buckets = rBody.data.buckets;
            reportList.total = rBody.data.total;
            if( lists.length === 0 ){
                reportList.listNormal = true;
            }
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
