<template>
    <div class="report-content">
        <div class="report-loading" v-show='isLoading'>
            <div>正在加载中，请稍候...</div>
        </div>
        <div class="ger-loading" v-show="noData">暂无数据</div>
        <div class="ger-loading" v-show="isError" @click="REPORT_REGET">加载失败，点击重试</div>
        <div class="report-charbox" id="report_summary_container"></div>
    </div>
</template>
<script type="text/javascript">
  import store from '../../store';
  import vuex from 'vuex';
  const mapState = vuex.mapState;
  const mapActions = vuex.mapActions;
  const summ = store.state.reportSummary;
  export default {
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
      ])
    }
  }
</script>
<style scoped="">

</style>
