<template> 
	<div class="report-detail-box">
		<h1>错误详情</h1>
		<ul class="report-detail-list">
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
            lists: state => reportDetail.lists
        })
    },
    methods:{
        ...mapActions(['REPORT_REGET'])
    }

}

</script>