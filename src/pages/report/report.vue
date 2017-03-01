<template>
    <table width="100%" class="ger-table">
        <thead>
            <tr>
                <td>域名</td>
                <td>今日错误数</td>
                <td>7日错误数</td>
                <td>15日错误数</td>
                <td>错误类型数</td>
                <td>报错脚本数</td>
                <td>最高错误类型</td>
                <td>操作</td>
            </tr>
        </thead>
    </table>
</template> 
<script type="text/javascript">
	
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
export default {
    computed: {
        ...mapState({
           
        })
    },
    methods: {
        
    }

   
}

</script>