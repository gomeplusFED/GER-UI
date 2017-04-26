<template> 
    <div class="report-content">
        <div class="report-loading" v-show='isLoading'>
            <div>正在加载中，请稍候...</div>
        </div>
        <div class="report-charbox" id="container"></div>
        <div class="clearfix report-doway">
            <span>最近：</span>
            <select @change="CHNAGE_DAY" v-model="selectDay">
                <option v-for="n in 15" :value="n">{{n}}天</option>
            </select>
            <a href="javascript:;" @click="ORDER_TIME" :class = "['', {'active': timeChange}]">按时间排序</a>
            <a href="javascript:;" @click="ORDER_TYPE":class = "['', {'active': typeChange}]">按错误类型数量排序</a>
            <span>按类型：</span>
            <select class="type-select" @change="CHNAGE_TYPE">
                <option>错误消息</option>
                <option>错误链接</option>
                <option>错误文件</option>
            </select>
            <input type="text" placeholder="请输入搜索关键词" @change="SEARCH_KEY"/>
            <a href="javascript:;" @click="SEARCH">搜索</a>
        </div>
        <ul class="ger-list-head clearfix">
            <li class="width-30">错误信息</li>
            <li class="width-15 t-c">时间</li>
            <li class="width-30">页面</li>
            <li class="width-15 t-c">同类型错误数</li>
            <li class="width-10 t-c">操作</li>
        </ul>
        <div  :class = "['ger-list-box', {'ger-noMore': !hasMorePage}]">
            <ul class="ger-list">
                <li class="clearfix" v-for="list in lists" track-by="list._id">
                    <div class="width-30">
                        <div class="list-over" :title="decodeURIComponent(list._source.message.msg)">{{decodeURIComponent(list._source.message.msg)}}</div>
                    </div>
                    <div class="width-15 t-c">{{decodeURIComponent(list._source.request_time)}}</div>
                    <div class="width-30">
                        <div class="list-over" v-if="list._source.message.title" :title="decodeURIComponent(list._source.message.title)">{{decodeURIComponent(list._source.message.title)}}</div>
                        <div class="list-over" v-if="!list._source.message.title" :title="decodeURIComponent(list._source.message.referer)">{{decodeURIComponent(list._source.message.referer)}}</div>
                    </div>
                    <div class="width-15 t-c">{{buckets.keys.indexOf(list._source.message.msg) !== -1 ? buckets.counts[buckets.keys.indexOf(list._source.message.msg)] : 1}}</div>
                    <div class="width-10 t-c">
                        <router-link target="_blank" :to="{ name: 'reportDetail', query:{ id: list._id, index: list._index, href: oldHref }}">查看更多</router-link>
                    </div>
                </li>
            </ul>
            <div class="ger-loading" v-show="!isLoading && !isError && isEmpty">暂无数据</div>
            <div class="ger-loading" v-show="isError && !isLoading && !isEmpty" @click="REPORT_REGET">加载失败，点击重试</div>
        </div>
        <page></page>
    </div>
</template> 
<script type="text/javascript">
import store from '../../store';
import page from '../public/page.vue';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const reportList = store.state.reportList;
export default {
    computed: {
        ...mapState({
            selectDay: state => reportList.selectDay,
            selectTypes: state => reportList.selectTypes,
            isError: state => reportList.isError,
            isLoading: state => reportList.loading,
            hasMorePage: state => reportList.hasMorePage,
            lists: state => reportList.lists,
            buckets: state => reportList.buckets,
            selectKey: state => reportList.selectKey,
            isEmpty: state => reportList.listNormal,
            local: state => reportList.local,
            pages: state => reportList.pages,
            oldHref: state => reportList.oldHref,
            timeChange: state => reportList.timeChange,
            typeChange: state => reportList.typeChange,
            dateList: state => reportList.dateList
        })
    },
    methods:{
        ...mapActions(['REPORT_REGET', 'CHNAGE_DAY', 'CHNAGE_TYPE', 'SEARCH', 'SEARCH_KEY', 'ORDER_TIME', 'ORDER_TYPE'])
    },
    components: {
        page
    },
    mounted() {
        let  char = document.getElementById('container');
        if(char.innerHTML == ''){
            char.classList.add('no_data');
            char.innerHTML = '暂无数据';
        }
    }
}

</script>
