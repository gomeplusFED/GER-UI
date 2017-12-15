<template>
    <div class="report-content">
        <div class="report-loading" v-show='isLoading'>
            <div>正在加载中，请稍候...</div>
        </div>
        <div class="ger-loading" v-show="noData">暂无数据</div>
        <div class="ger-loading" v-show="isError">加载失败，点击重试</div>
        <div class="clearfix report-doway report-summary-type">
            <span>最近：</span>
            <select v-model="dateRange">
                <option value="7">7天</option>
                <option value="15">半个月</option>
                <option value="30">一个月</option>
                <option value="90">三个月</option>
                <option value="180">半年</option>
            </select>
            <a href="javascript:;" @click="search">搜索</a>
        </div>
        <div class="report-charbox report-charbox-summary" id="report_summary_container"></div>
    </div>
</template>
<script type="text/javascript">
  import store from '../../store';
  import vuex from 'vuex';
  const mapState = vuex.mapState;
  const mapActions = vuex.mapActions;
  const summ = store.state.reportSummary;
  export default {
    data(){
      return {
        dateRange: 7
      }
    },
    computed: {
      ...mapState({
        isLoading: ()=> summ.isLoading,
        noData: ()=> summ.noData,
        isError: ()=> summ.isError
      })
    },
    methods:{
      ...mapActions([
        'RENDER_CHARTS'
      ]),
      search(){
        this.RENDER_CHARTS(parseInt(this.dateRange));
      }
    }
  }
</script>
<style scoped>
    .report-content .report-charbox-summary{
        height: 450px;
    }
    .report-content .report-summary-type select{
        width: 70px;
    }
</style>
