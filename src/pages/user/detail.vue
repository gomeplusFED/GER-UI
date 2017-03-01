<template> 
    <div>
        <div class="right_area userdetail">
            <p class="content_title">用户详情</p>
            <ul>
                <li>
                    <label for="username">用户名: </label><input type="text" id="username" class="username">
                </li>
                <li>
                    <label for="password">密　码: </label><input type="password" id="password" class="password">
                </li>
                <li class="clearfix">
                    <label class="fl" for="domains">域名组: </label>
                    <textarea class="domains" id="domains"></textarea>
                </li>
            </ul>
            <div class="submit">
                <input type="button" class="create" value="创建">
                <input type="button" class="back" value="返回">
            </div>
        </div>
    </div>
</template> 
<script> 
</script>