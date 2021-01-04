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
                    title: 'Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Age',
                    dataIndex: 'age'
                }
            ],
            data: [
                {
                   name: '123',
                   age: '123' 
                },
                {
                   name: 'test',
                   age: '123' 
                },
                {
                   name: '123',
                   age: '123' 
                },

            ]
        })
        return {
            ...toRefs(state)
        }
    }
});
</script>

