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
					<span v-html="fixMsg(message[v], v) || '--'"></span>
				</div>
			</li>

			<li class="clearfix">
				<div>
					<em class=""><span>*</span>message.uaDetail</em>
				</div>
				<div class="ua-details">
					<ul>
						<li v-for="(v, i) in message.uaDetail">
							<span>{{i}}:</span>{{v}}
						</li>
					</ul>
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

			<li class="clearfix detail-breadcrumbs">
				<div>
					<em class=""><span>*</span>message.breadcrumbs</em>
				</div>
				<div>
					<ul v-if="breadcrumbs.length > 0">
						<li v-for="(v) in breadcrumbs" v-html="parseBreadcrumbs(v)">
						</li>
					</ul>
					<ul v-else><li>--</li></ul>
				</div>
			</li>
		</ul>
		<div class="detail-upload">
			
			<h1>获取报错文件真实行列数</h1>
			<div class="detail-upload-warp">
				<div class="clearfix">
					<span>上传：</span>
					<a href="javascript:;" class="detail-uploadbtn">
						上传
						<input type="file"  name="map" @change="FILE_CHANGE"/>
					</a>
				</div>
				<ul v-show="isMapShow&&!isMapError">
					<li class="clearfix">
						<span>目标文件：</span>
						<span>{{map.source}}</span>
					</li>
					<li class="clearfix">
						<span>反解前行数：</span>
						<span>{{message.rowNum}}</span>
					</li>
					<li class="clearfix">
						<span>反解前列数：</span>
						<span>{{message.colNum}}</span>
					</li>
					<li class="clearfix">
						<span>反解后行数：</span>
						<span>{{map.line}}</span>
					</li>
					<li class="clearfix">
						<span>反解后列数：</span>
						<span>{{map.column}}</span>
					</li>
					<li class="clearfix">
						<span>错误信息：</span>
						<span>{{message.msg}}</span>
					</li>
				</ul>
				<div v-show="!isMapShow&&isMapError">获取错误，请重试！</div>
			</div>
		</div>
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
          	breadcrumbs: state => {
              let breadcrumbs;
              try {
                breadcrumbs = JSON.parse(reportDetail.message.breadcrumbs)
			  } catch (e){
                breadcrumbs = [];
			  }
			  return breadcrumbs;
			},
            ext: state => reportDetail.ext,
            isMapShow: state => reportDetail.isMapShow,
            isMapError: state => reportDetail.isMapError,
            map: state => reportDetail.map
        })
    },
    methods:{
        ...mapActions(['REPORT_REGET', 'FILE_CHANGE']),
	  fixMsg(msg, type){
        msg = decodeURIComponent(msg);
        if(!msg) return;
        if (type === 'msg') {
          msg = msg.replace(/ at /g, '<br/>at ')
        }
        return msg;
	  },
	  parseBreadcrumbs(breadcrumbs){
	    let result = '';
	    for(let key in breadcrumbs){
	      if(key === 'outerHTML'){
            result += key + ': ' + this.HTMLEncode(breadcrumbs[key]) + '<br/>';
          } else {
            result += key + ': ' + breadcrumbs[key] + '<br/>';
          }
		}
		return result;
	  },
      HTMLEncode(html) {
        let temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        const output = temp.innerHTML;
        temp = null;
        return output;
      }
    }

}

</script>
<style>
	.report-detail-box .report-detail-list .detail-breadcrumbs div ul li{
		padding: 15px 10px;
		line-height: 150%;
	}
    .report-detail-box .report-detail-list .detail-breadcrumbs div ul li:last-child{
        border-bottom: 0;
    }
    .report-detail-box .report-detail-list .detail-breadcrumbs div em{
        line-height: inherit;
    }
</style>