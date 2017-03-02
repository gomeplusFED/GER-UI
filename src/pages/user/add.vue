<template> 
    <div>
        <div class="right_area useradd">
        	<p class="content_title">添加用户</p>
            <label for="username">用户名: </label><input type="text" id="username" class="username">
            <div class="submit">
                <a href="#" class="btns create">创建</a>
                <!-- <input type="button" class="back" value="返回"> -->
            	<router-link to="/index"  active-class="active" class="btns back">返回</router-link>
            </div>
        </div>
    </div>
</template> 