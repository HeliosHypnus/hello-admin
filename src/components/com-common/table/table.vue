<template>
    <a-table
    :columns="columns"
    :row-key="setKey"
    :data-source="data"
    :pagination="dePagination"
    :loading="loading"
    @change="handleTableChange"
    v-bind="{...$props, ...$attrs}"
    >
    <template v-slot:title>
      <div class="left-title">
        <a-button>Refresh</a-button>
      </div>
      <div class="right-title">
        <slot name="right-title"></slot>
      </div>
    </template>
    <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
    <!-- <slot v-if="$slots[slotItem.slots.customRender]" :name="slotItem.slots.customRender" v-bind="slotProps"></slot> -->
  </a-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue';
import {ColumnProps, TableProps} from 'ant-design-vue/lib/table/interface'
import {PaginationProps} from 'ant-design-vue/lib/pagination/Pagination'
export { default as omit } from 'lodash/omit';
interface Columns extends ColumnProps{
  actions?: any
  dataIndex: string
}

type pageOption = Partial<typeof PaginationProps>

interface Props extends Omit<TableProps, 'columns'>{
  columns: Columns[]
  rowKey: string | ((record: any) => string)
  pageOption: pageOption
  getList: (prams: any) => any
}
export default defineComponent({
    name: 'table',
    props: {
        columns: {
            type: Object as PropType<Columns[]>
        },
        rowSelection: {
            type: Object
        },
        rowKey: { // 表格唯一字段
            type: [String, Function] as PropType<string | ((record: any) => string)>,
        },
        pageOption: { // 分页参数
            type: Object as PropType<pageOption>,
            default: () => ({})
        },
        getList: {
            type: Function
        }
    },
    setup(props: any) {
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
                pageSizeOptions: ['10', '20', '30'],
                pageSize: 10,
                current: 1,
                total: 0
            }
        });
        const setKey = (a: any) => {
            return a.id
        }
        const initTableData = async(params = {}) => {
            params = {
                page: state.dePagination.current,
                limit: state.dePagination.pageSize,
                ...props.pageOption,
                ...params
            }
            const { data } = await props.getList(params)
            if (data.code === 200) {
                state.data = data.data.list
                state.dePagination.total = data.data.meta.total
            }
        }
        initTableData()
        // 底部分页组件变化
       const handleTableChange = (page: any[]) => {
            state.dePagination = {...state.dePagination, ...page};
            // if (this.isReocrdPage) this.getCurrentPage(this.isRowSpan ? page.current / 2 : page.current);
            // init();
        }
        return {
            ...toRefs(state),
            handleTableChange,
            initTableData,
            setKey
        }
    }
});
</script>
<style lang="less">
    .ant-table-title {
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
    }
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
