<template>
    <div class="about">

                <Table :columns="columns" :tableData="data"></Table>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Table from '@/components/com-common/table/table.vue'
export default defineComponent({
    name: 'user',
    components: {
        Table
    },
    setup() {
        const state = reactive({
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: 'Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Roles',
                    dataIndex: 'roles'
                },
                {
                    title: 'Created At',
                    dataIndex: 'created_at'
                },
                {
                    title: 'Updated At',
                    dataIndex: 'updated_at'
                },
            ],
            data: [
                {
                    id: '1',
                    name: 'admin',
                    roles: ['Admin', 'Test'],
                    created_at: '2020-09-20',
                    updated_at: '2020-09-22'
                },
                {
                    id: '2',
                    name: 'admin',
                    roles: ['Admin', 'Test'],
                    created_at: '2020-09-22',
                    updated_at: '2020-09-29'
                },
                {
                    id: '3',
                    name: 'admin',
                    roles: ['Admin', 'Test'],
                    created_at: '2020-10-20',
                    updated_at: '2020-11-22'
                },
                {
                    id: '4',
                    name: 'admin',
                    roles: ['Admin', 'Test'],
                    created_at: '2021-01-01',
                    updated_at: '2021-01-02'
                }
            ]
        })
        return {
            ...toRefs(state)
        }
    }
});
</script>

