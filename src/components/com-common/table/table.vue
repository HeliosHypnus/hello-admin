<template>
    <a-table
    :columns="columns"
    :row-key="setKey"
    :data-source="tableData || data"
    :pagination="pagination ? dePagination : false"
    :loading="loading"
    @change="handleTableChange"
    >
    <template #name="{ text }"> {{ text.first }} {{ text.last }} </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'table',
    props: {
        columns: {
            type: Array,
            default: () => ([])
        },
        tableData: {
            type: [Array, String],
            default: ''
        },
        pagination: {
            type: [Boolean, Object],
            default: () => true
        }
    },
    setup() {
        const state = reactive({
            loading: false,
            data: [],
            dePagination: {
                position: 'bottom',
                showQuickJumper: true,
                showSizeChanger: true,
                size: 'small',
                showTotal: (total: number) => `总共 ${total} 条`,
                type: null,
                pageSizeOptions: [],
                pageSize: 10,
                current: 1,
                total: 0
            }
        });
        const setKey = (a: any) => {
            return a.id
        }
        // 底部分页组件变化
       const handleTableChange = (page: any[]) => {
            state.dePagination = {...state.dePagination, ...page};
            // if (this.isReocrdPage) this.getCurrentPage(this.isRowSpan ? page.current / 2 : page.current);
            // init();
        }
        return {
            ...toRefs(state),
            handleTableChange,
            setKey
        }
    }
});
</script>
