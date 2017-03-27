<template>
    <div class="ger-list-content">
        <ul class="ger-list-head clearfix">
            <li class="width-18">域名</li>
            <li class="width-10 t-c">今日错误数</li>
            <li class="width-10 t-c">7日错误数</li>
            <li class="width-10 t-c">15日错误数</li>
            <li class="width-10 t-c">错误类型数</li>
            <li class="width-10 t-c">报错脚本数</li>
            <li class="width-22">最高错误类型</li>
            <li class="width-10 t-c">操作</li>
        </ul>
            
        
        <div class="ger-list-box">
            <ul class="ger-list">
                <li class="clearfix" v-for="list in reportList">
                    <div class="width-18">
                        <div class="list-over" :title=list.key>{{list.key}}</div>
                    </div>
                    <div class="width-10 t-c">1</div>
                    <div class="width-10 t-c">2</div>
                    <div class="width-10 t-c">{{list.doc_count}}</div>
                    <div class="width-10 t-c">4</div>
                    <div class="width-10 t-c">5</div>
                    <div class="width-22">
                        <div class="list-over" title="message">message</div>
                    </div>
                    <div class="width-10 t-c">
                        <router-link :to="{ name: 'list', query: { href: list.key }}">查看更多</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="ger-list-bottom">
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
export default {
    computed: {
        ...mapState({
            reportList:state => store.state.report.list
        })
    },
    methods:{
        //...mapActions(['DELETE_USER'])
    }

}

</script>