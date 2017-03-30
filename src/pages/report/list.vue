<template> 
	<div class="report-content">
		<div class="report-charbox"></div>
		<div class="clearfix report-doway">
			<span>最近：</span>
			<select @change="CHNAGE_DAY">
				<option v-for="n in 15" :vaule="n" >{{n}}天</option>
			</select>
			<a href="javascript:;">按时间排序</a>
			<a href="javascript:;">按错误类型数量排序</a>
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
				<li class="clearfix" v-for="list in lists">
					<div class="width-30">
						<div class="list-over" :title="list._source.message.msg">{{list._source.message.msg}}</div>
					</div>
					<div class="width-15 t-c">{{list._source.request_time}}</div>
					<div class="width-30">
						<div class="list-over" :title="list._source.message.title">{{list._source.message.title}}</div>
					</div>
					<div class="width-15 t-c">{{buckets.counts[buckets.keys.indexOf(list._source.message.msg)]}}</div>
					<div class="width-10 t-c">
						<router-link :to="{ name: 'reportDetail'}">查看更多</router-link>
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
   
</template> 
<script type="text/javascript">
	
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const reportList = store.state.reportList;
export default {
    computed: {
        ...mapState({
            selectDays: state => reportList.selectDays,
            selectTypes: state => reportList.selectTypes,
            isError: state => reportListtore.isError,
            isLoading: state => reportList.loading,
            hasMorePage: state => reportList.hasMorePage,
            lists: state => reportList.lists,
            buckets: state => reportList.buckets,
            selectKey: state => reportList.selectKey
        })
    },
    methods:{
        ...mapActions(['REPORT_REGET', 'CHNAGE_DAY', 'CHNAGE_TYPE', 'SEARCH', 'SEARCH_KEY'])
    }

}

</script>