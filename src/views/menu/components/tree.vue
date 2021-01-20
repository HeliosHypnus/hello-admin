<template>
	<a-spin :spinning="spinning" >
		<a-tree
            v-if="treeData.length > 0"
            class="u-tree"
			:selectable="false"
			:replace-fields="replaceFields"
			v-model:checkedKeys="checkedKeys"
            defaultExpandAll
            :showIcon="true"
			@check="onCheck"
		>
                <a-tree-node v-for="item in treeData" :title="item.title" :key="item.id">
                    <template #icon>
                        <i class="iocnfont" :class="'icon-' + item.icon"></i>
                    </template>
                    <a-tree-node v-for="v in item.children" :key="v.id" >
                        <template #icon>
                            <i class="iocnfont" :class="'icon-' + v.icon"></i>
                        </template>
                        <template #title>
                            <span class="tree-title">{{v.title}}</span>
                            <span class="tree-url">{{v.uri}}</span>
                            <div class="action">
                                <slot name="action" v-bind="v"></slot>
                            </div>
                        </template>
                    </a-tree-node>
                </a-tree-node>
		</a-tree>
	</a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted, PropType } from "vue";
import { Tree, Spin } from "ant-design-vue";
import { getMenu } from "@/server/menu";
import {MenuItem} from '@/tyings/index'

export default defineComponent({
  name: "access-tree",
  components: { [Tree.name]: Tree, [Spin.name]: Spin },
  emits: ["update:value"], // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      treeData: [],
      spinning: false,
      replaceFields: {
        key: "id",
      },
    });

    // 列表转树
    const treeList = (items, parent = 0) => {
      return items
        .filter((item) => item.parent_id == parent)
        .map((item) => ({
          ...item,
          title: item.title ,
          children: item.children ? treeList(item.children, item.id) : [],
        }));
    };

    // 已勾选的节点
    const checkedKeys = computed({
      get: () => props.value,
      set: (val: any) =>
        emit("update:value", Array.isArray(val) ? val : val.checked),
    });

    onMounted(async () => {
      // 获取菜单列表
      state.spinning = true;
      const {data} = await getMenu().finally(
        () => (state.spinning = false)
      );
      if (data.code === 200) {
        state.treeData = treeList(data.data);
        console.log(state.treeData)
      }
    });

    // 获取所有父节点的key
    const getParentsKey = (treeNode, arr: number[] = []) => {
      if (treeNode.eventKey) {
        arr.push(treeNode.eventKey);
        return getParentsKey(treeNode.vcTreeNode, arr);
      }
      return arr;
    };

    // 获取所有子节点的key
    const getChildrenKeys = (treeNode, arr: number[] = []) => {
      if (treeNode?.children.length > 0) {
        console.log(treeNode.children, "children");
        return treeNode.children.reduce((prev, curr) => {
          if (curr.children.length > 0) {
            prev.push(...getChildrenKeys(curr, prev), []);
          }
          return prev.concat([curr.id]);
        }, arr);
      }
      return arr;
    };

    // 勾选事件处理函数
    const onCheck = (keys, { node, checked }) => {
      let tempKeys: number[] = checkedKeys.value;
      // 子节点选中，父节点必然要选中
      if (checked) {
        tempKeys = [
          ...new Set([
            ...checkedKeys.value,
            ...keys.checked,
            ...getParentsKey(node.vcTreeNode),
            ...getChildrenKeys(node.dataRef),
          ]),
        ];
      } else {
        const childrenKeys = getChildrenKeys(node.dataRef);
        console.log(childrenKeys, "childrenKeys");
        if (childrenKeys.length > 0) {
          tempKeys = keys.checked.filter(
            (item) => !childrenKeys.includes(item)
          );
        } else {
          tempKeys = keys.checked;
        }
        // 获取所有同级节点
        const children =
          node.vcTreeNode?.dataRef?.children?.map((item) => item.id) || [];
        // 如果当前所有选中的节点中没有包含任何一个直属子节点
        if (!children.some((item) => tempKeys.includes(item))) {
          tempKeys = tempKeys.filter(
            (item) => item != node.vcTreeNode?.eventKey
          );
        }
      }
      checkedKeys.value = tempKeys;
    };

    return {
      ...toRefs(state),
      checkedKeys,
      onCheck,
    };
  },
});
</script>

<style lang="less" >
.u-tree {
    &.ant-tree {
        text-align: left;
        // .ant-tree-treenode-switcher-close, .ant-tree-treenode-switcher-open {
        //     border: 1px solid #ccc;
        // }
        .tree-title {
            margin-right: 20px;
            &:hover {
                color: #00375b;
            }
        }
        .action {
            float: right;
            display: inline-block;
            .anticon {
                padding: 0px 5px;
                transition: all .3s;
                &:hover {
                    color: #00375b;
                }
            }
        }
        .tree-url {
            color: #00375b;
            font-weight: normal;
        }
        .ant-tree-node-content-wrapper {
            width: calc(100%  - 10px);
            border: 1px solid #eaeff0;
            padding: 5px 0 !important;
            box-sizing: content-box;
            padding-left: 10px !important;
            font-weight: bolder;
            font-size: 16px;
        }
        .ant-tree-switcher {
            padding: 5px 0;
        }
    }
}
</style>
