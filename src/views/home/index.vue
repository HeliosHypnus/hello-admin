<template>
    <div class="n-home">
        <a-layout>
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
    .ant-layout {
        // flex-direction: inherit;
    }
    .n-layout-content {
        padding: 15px;
        // height: calc(~"100vh - 56px");
        margin: 24px 16px;
        background: #fff;
        min-height: calc(~"100vh - 104px") 
    }
}
</style>
