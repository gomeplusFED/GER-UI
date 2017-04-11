<template> 
    <div class="ger-list-bottom" v-if="hasMorePage">
        <router-link v-if="pages.currentPage != 1" :to="{ name: 'list', query: { href: oldHref, page : pre }}">上一页</router-link>
        <router-link v-if="pages.currentPage > 3" :to="{ name: 'list', query: { href: oldHref, page : 1 }}">{{1}}</router-link>
        <span v-if="pages.currentPage > 3">...</span>
        <router-link :class="index == pages.currentPage ? 'active':''" v-for="index in pageCount"  :to="{ name: 'list', query: { href: oldHref, page : index }}">{{index}}</router-link>
        <span v-if="pages.pages - 3 >= pages.currentPage">...</span>
        <router-link  v-if="pages.pages - 3 >= pages.currentPage" :to="{ name: 'list', query: { href: oldHref, page : pages.pages }}">{{pages.pages}}</router-link>
        <router-link v-if="pages.currentPage != pages.pages" :to="{ name: 'list', query: { href: oldHref, page : next }}">下一页</router-link>
    </div>
</template>
<script type="text/javascript">
import store from '../../store';
import vuex from 'vuex';
const mapState = vuex.mapState;
const mapActions = vuex.mapActions;
const list = store.state.reportList;
export default {
    computed: {
        ...mapState({
            selectDay: state => list.selectDay,
            hasMorePage: state => list.hasMorePage,
            lists: state => list.lists,
            pages: state => list.pages,
            oldHref: state => list.oldHref
        }),
        pageCount : function (){
            let n = parseInt(this.pages.currentPage);
            let min = n - 2;
            let max = n + 2;
            let arr = [];
            
            if(min < 2){
                arr = [1, 2, 3, 4, 5];
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
            let n = parseInt(this.pages.currentPage);
            return --n;
        },
        next : function (){
            let n = parseInt(this.pages.currentPage);
            // 如果url上带有页码并且大于页码总数  默认跳转最后一页
            if(this.pages.currentPage > this.pages.pages){
                let reg = new RegExp('page=\\d+');
                let href = window.location.href.replace(reg, 'lastDays='+ this.selectDay +'&page=1');
                window.location.href = href;
            }
            return ++n;
        },
        newList : function (){
            if(!this.lists.length)return;
            let newList = this.lists.slice(this.pages.froms, this.pages.froms + 5);
            return newList;
        }
    }
}
</script>