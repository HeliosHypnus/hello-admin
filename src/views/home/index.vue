<template>
    <div class="n-home">
        <a-layout class="ant-layout-has-sider">
            <SideLeft/>
            <a-layout>
                <Header/>
                <a-layout-content class="n-layout-content">
                    <Main/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>
<script lang="ts">
import Header from '@/components/layout/header/header.vue';
import Main from '@/components/layout/main/main.vue';
import SideLeft from '@/components/layout/sideLeft/sideLeft.vue';

export default {
	components: {
        Header,
        Main,
        SideLeft
    }
};
</script>
<style lang='less'>
.n-home {
    width: 100%;
    .n-layout-content {
        // padding: 15px;
        // height: calc(~"100vh - 56px");
        margin: 24px 16px;
        background: #fff;
        min-height: calc(~"100vh - 104px") 
    }
}
.m-dark {
    .n-home {
        .n-layout-content {
            background: #2c2c43;
        }
    }
}
</style>
