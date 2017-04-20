<template> 
    <div class="ger-list-bottom" v-if="hasMorePage">
        <a href="javascript:;" v-if="pages.currentPage != 1"  @click="CHANGE_PAGE(pre)">上一页</a>
        <a href="javascript:;" v-if="pages.currentPage > 3" @click="CHANGE_PAGE(1)">1</a>
        <span v-if="pages.currentPage > 3">...</span>
        <a href="javascript:;" :class="index == pages.currentPage ? 'active':''" v-for="index in pageCount"  @click="CHANGE_PAGE(index)">{{index}}</a>
        <span v-if="pages.pages - 3 >= pages.currentPage">...</span>
        <a href="javascript:;" v-if="pages.pages - 3 >= pages.currentPage"   @click="CHANGE_PAGE(pages.pages)">{{pages.pages}}</a>
        <a href="javascript:;" v-if="pages.currentPage != pages.pages"  @click="CHANGE_PAGE(next)">下一页</a>
    </div>
</template>
<script type="text/javascript">
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const pageModule = store.state.pageModule;
export default {
    computed: {
        ...mapState({
            hasMorePage: state => pageModule.hasMorePage,
            pages: state => pageModule.pages
        }),
        pageCount : function (){
            let n = parseInt(this.pages.currentPage);
            let min = n - 2;
            let max = n + 2;
            let arr = [];
            
            if(min < 2){
                if(this.pages.pages > 5){
					arr = [1, 2, 3, 4, 5];
                }else{
                	for(var i = 1; i <= this.pages.pages; i++){
	                    arr.push(i);
	                }
                }
            }else if(max + 1 > this.pages.pages){
                for(var i = this.pages.pages - 4; i <= this.pages.pages; i++){
                    arr.push(i);
                }
            }else{
                for(var i = min; i <= max; i++){
                    arr.push(i);
                }
            }
            return arr;
        },
        pre : function (){
            return (parseInt(this.pages.currentPage, 10) - 1);
        },
        next : function (){
            return (parseInt(this.pages.currentPage, 10) + 1);
        }
    },
    methods:{
        ...mapActions(['CHANGE_PAGE'])
    }
}
</script>