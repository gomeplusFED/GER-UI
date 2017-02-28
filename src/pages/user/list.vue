<template> 
    <div class="ger-cotent">
        <div class="right_area userlist">
            <ul class="list-group" v-if="items">sadsadssadsad
            	<li v-for="item in items">
					<a :data-id="item.id" href="#">{{ item.message }}</a>
            		<input type="button" class="btn delete fr" value="删除" />
            		<input type="button" class="btn edit fr" value="编辑" />
				</li>
            	<!-- 
            	<li class="list-group-item">
            		<a href="#">1. 用户名 user-1 创建时间:2017-02-01</a>
            		<input type="button" value="删除" class="btn delete fr">
            		<input type="button" value="编辑" class="btn edit fr">
            	</li> 
            	-->
            </ul>
        </div>
    </div>
</template> 