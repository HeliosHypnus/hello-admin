<template>
  <div class="role">
    <Table :columns='columns' :getList='roleList' ref="tableRef">
		<template v-slot:right-title>
			<a-button @click="addRole" type="primary">
				添加
			</a-button>
		</template>
    </Table>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue';
import Table from '@/components/com-common/table/table.vue';
import { roleList, adminRole } from '@/server/admin';
import {useFormModal} from "@/hooks/formModal";
import { getFormSchema } from "./form-schema";
export default defineComponent({
  name: 'user',
  components: {
    Table
  },
  setup() {
	const tableRef = ref<any>(null)
    const state = reactive({
		columns: [
			{
				title: 'ID',
				dataIndex: 'id',
				slots: {
					customRender: 'id',
				}
			},
			{
				title: 'Slug',
				dataIndex: 'slug',
			},
			{
				title: 'Name',
				dataIndex: 'name',
			},
			{
				title: 'Created At',
				dataIndex: 'created_at',
			},
			{
				title: 'Updated At',
				dataIndex: 'updated_at',
			},
		],
	});
	// 添加角色
    const addRole = () => {
		useFormModal({
			title: '添加角色',
			formSchema: getFormSchema(),
			handleOk: async (modelRef) => {
				const { name, permissions, slug } = modelRef
				const params = {
					name,
					permissions: permissions.join(','),
					slug
				}
			const {data} = await adminRole(params)
			if (data.code === 200) {
				tableRef.value.initTableData()
			}
			}
		})
    };
    return {
		...toRefs(state),
		roleList,
		addRole,
		tableRef
    };
  },
});
</script>
<style lang='less' scoped>
</style>
