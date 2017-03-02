<template> 
    <div class="">
        <div class="right_area userdetail">
            <p class="content_title">用户详情</p>
            <form>
	            <ul>
	                <li>
	                	<input style="display:none;" />
	                    <label for="username">用户名: </label><input class="username" type="text" id="username" autocomplete="new-password">
	                </li>
	                <li>
	                    <label for="password">密　码: </label><input class="password"  type="password" id="password" autocomplete="new-password">
	                </li>
	                <li class="clearfix">
	                    <label class="fl" for="domains">域名组: </label>
	                    <textarea class="domains" id="domains"></textarea>
	                </li>
	            </ul>
            </form>
            <div class="submit">
            	<a class="btns" href="#">创建</a>
            	<router-link to="/index"  active-class="active" class="btns back">返回</router-link>
            </div>
        </div>
    </div>
</template> 
<script>
</script>
