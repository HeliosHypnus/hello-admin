import {createVNode} from 'vue'
import Tree from './components/tree.vue'
import {FormSchema} from "@/tyings/schema";
import { permissionList } from "@/server/admin";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    style: {
        width: "auto"
    },
    formItemLayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    },
    formItem: [
        {
            type: 'input',
            label: 'Slug',
            field: 'slug',
            value: '',
            props: {
                placeholder: '请输入Slug'
            },
            rules: [
                {
                    required: true,
                    message: 'Slug不能为空'
                }
            ]
        },
        {
            type: 'input',
            label: 'Name',
            field: 'name',
            value: '',
            props: {
                placeholder: '请输入Name'
            },
            rules: [
                {
                    required: true,
                    message: 'Name不能为空'
                }
            ]
        },
        {
            type: createVNode(Tree),
            label: "资源",
            field: "permissions",
            value: [],
            asyncValue: async (currentValue, formInstance) => {
                const {id} = formInstance?.props.fields as any
                // 获取角色列表
                const { data } = await permissionList(id)
                if (data.code === 200) {
                    return data.data.map(item => item.id)
                }
                // 设置角色复选框选项
            }
        }
    ]
})

