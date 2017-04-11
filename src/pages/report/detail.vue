<template> 
	<div class="report-detail-box">
		<h1>错误详情</h1>

        <div class="report-loading" v-show='isLoading'>
            <div>正在加载中，请稍候...</div>
        </div>
        <div class="report-loading" v-show='isError' @click="REPORT_REGET">
            <div>加载失败，请重试！</div>
        </div>
		<ul class="report-detail-list" v-show="!isLoading && !isError">
			<li class="clearfix" v-for="(v, i) in messageKeys">
				<div><span>*</span>message.{{v}}</div>
				<div>
					<span>{{message[v] || '--'}}</span> 
				</div>
			</li>

			<li class="clearfix" v-for="(v, k) in ext">
				<div>ext.{{k}}</div>
				<div>
					<span>{{v || '--'}}</span> 
				</div>
			</li>
			<li class="clearfix" v-for="(value, key) in lists">
				<div>{{key}}</div>
				<div>
					<span>{{decodeURIComponent(value) || '--'}}</span>
				</div>
			</li>
		</ul>
	</div>
</template> 
<script type="text/javascript">
	
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const reportDetail = store.state.reportDetail;
export default {
    computed: {
        ...mapState({
            isError: state => reportDetail.isError,
            isLoading: state => reportDetail.loading,
            lists: state => reportDetail.lists,
            messageKeys: state => reportDetail.messageKeys,
            message: state => reportDetail.message,
            ext: state => reportDetail.ext
        })
    },
    methods:{
        ...mapActions(['REPORT_REGET'])
    }

}

</script>