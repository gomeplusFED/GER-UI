<template> 
    <div>
        <div class="right_area useradd">
        	<p class="content_title">添加用户</p>
            <label for="username">用户名: </label><input type="text" id="username" class="username">
            <div class="submit">
                <input type="button" class="create" value="创建">
                <!-- <input type="button" class="back" value="返回"> -->
            	<router-link to="/index"  active-class="active" class="back">返回</router-link>
            </div>
        </div>
    </div>
</template> 