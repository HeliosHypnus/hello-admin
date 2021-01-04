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
<style lang="less">
    .m-dark {
        .ant-table-body {
            color: #a8a9bb;
            padding: 0 10px 10px 10px;
            .ant-table-thead > tr > th {
                background: #223 !important;
                color: #a8a9bb;
                 border-bottom: none;
            }
            tr {
                background: #2c2c43;
                td {
                    border-bottom: 1px solid #000;
                }
            }
            tr:hover {
                td {
                    background: #2c2c43 !important;
                }
            }
        }
        .ant-table {
            background: #223 !important;
        }
        .ant-pagination {
            color: #a8a9bb !important;
            .ant-select-selector {
                background: #223;
                border: 1px solid #223;
            }
            .ant-select-selector {
                background-color: #223 !important;
                border: 1px solid #223 !important;
                .ant-select-selection-item {
                    color: #a8a9bb !important; 
                }
            }
            .ant-select-arrow {
                color: #a8a9bb !important;
            }
        }
        .ant-pagination-item-active {
            background: #223;
            border-color: #223;
            color: #a8a9bb;
            a {
                color: #a8a9bb !important;
            }
        }
        .ant-pagination-prev, .ant-pagination-next {
            a {
                color: #a8a9bb !important;
            }
        }
    }
</style>
