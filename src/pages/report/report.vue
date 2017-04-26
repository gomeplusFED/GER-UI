<template>
    <div class="ger-list-content" v-if="reportList.length">
        <ul class="ger-list-head clearfix">
            <li class="width-16">域名</li>
            <li class="width-8">终端</li>
            <li class="width-8 t-c">今日错误数</li>
            <li class="width-8 t-c">7日错误数</li>
            <li class="width-10 t-c">15日错误数</li>
            <li class="width-10 t-c">15日错误类型数</li>
            <li class="width-10 t-c">15日报错脚本数</li>
            <li class="width-22 t-c">15日最高错误类型</li>
            <li class="width-8 t-c">操作</li>
        </ul>
        <div  :class = "['ger-list-box', {'ger-noMore': !hasMorePage}]">
            <div class="ger-loading" v-show="isLoading && !isError">正在加载中，请稍后...</div>
            <div class="ger-loading" v-show="isError && !isLoading" @click="REPORT_REGET">加载失败，点击重试</div>
            <ul class="ger-list" v-show="!isError && !isLoading">
                <li class="clearfix" v-for="list in reportList" track-by="list.local">
                    <div class="width-16">
                        <div class="list-over" :title=list.local>{{list.local}}</div>
                    </div>
                    <div class="width-8">{{list.type == 'all' ? '全部' : list.type}}</div>
                    <div class="width-8 t-c">{{list.todayErrorNum}}</div>
                    <div class="width-8 t-c">{{list.weekErrorNum}}</div>
                    <div class="width-10 t-c">{{list.lastFifteenErrorNum}}</div>
                    <div class="width-10 t-c">{{list.errorType}}</div>
                    <div class="width-10 t-c">{{list.scriptErrorNum}}</div>
                    <div class="width-22 t-c">
                        <div class="list-over" :title="decodeURIComponent(list.highError)">{{decodeURIComponent(list.highError)}}</div>
                    </div>
                    <div class="width-8 t-c">
                        <router-link target="_blank" :to="{ name: 'list', query: { href: list.local, 'type': list.type }}">查看更多</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ger-list-bottom" v-if="hasMorePage">
            <a href="javascript:;">上一页</a>
            <a href="javascript:;" class="active">1</a>
            <a href="javascript:;">2</a>
            <a href="javascript:;">3</a>
            <a href="javascript:;">4</a>
            <span>....</span>
            <a href="javascript:;">5</a>
            <a href="javascript:;">下一页</a>
        </div>
    </div>
    <div class="ger-list-content-empty" v-if="!reportList.length">
        您关注的域名15内都无报错!
    </div>
</template> 
<script type="text/javascript">
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
export default {
    computed: {
        ...mapState({
            reportList:state => store.state.report.list,
            isError: state => store.state.report.isError,
            isLoading: state => store.state.report.loading
        })
    },
    methods:{
        ...mapActions(['REPORT_REGET'])
    }
}
</script>
