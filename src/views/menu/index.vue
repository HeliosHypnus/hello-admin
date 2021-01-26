<template>
    <div class="menu">
        <a-row :gutter="16">
            <a-col :span="14">
                <div class="box">
                    <Tree >
                        <template v-slot:action="v">
                            <FormOutlined @click="() => edit(v)" />
                            <DeleteOutlined @click="() => dele(v)" />
                        </template>
                    </Tree>
                </div>
            </a-col>
            <a-col :span="10">
                <div class="box">

                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import { getMenu } from '@/server/menu'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import Tree from './components/tree.vue'
export default defineComponent({
    name: 'menu',
    components: {
        Tree,
        DeleteOutlined,
        FormOutlined
    },
    setup() {
        const edit = (v) => {
            console.log('d')
        }
        const dele = (v) => {
            console.log('dasd')
        }
        return {
            edit,
            dele
        }
    }
})
</script>
<style lang="less" scoped>
    .menu {
        min-height: calc(~"100vh - 104px");
        background: #f0f2f5;
        .box {
            min-height: calc(~"100vh - 104px");
            background: #fff;
            padding: 10px;
        }
    }
</style>