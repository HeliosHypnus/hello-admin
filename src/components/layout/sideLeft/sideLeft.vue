<template>
    <a-layout-sider
        :trigger="null"
        collapsible
        :theme="theme"
        v-model:collapsed="isCollapse"
        :class="{sider: isCollapse}"
        width="260"
    >
        <div class="logo">
            <img src="../../../assets/logo.png" alt="">
            <h1 :class="{hideTitle: isCollapse}">hello Admin</h1>
        </div>
        <a-menu
            class="theme"
            mode="inline"
            :defaultSelectedKeys="activeMenu"
            :selectedKeys="activeMenu"
            @click="setActiveMenu">
                <template v-for="item in routers[0].children" :key="item.path">
                    <a-menu-item :key="item.path" v-if="!item.children">
                        <span><span class="anticon"><i class="iconfont" :class="item.meta && item.meta.icon"></i></span><span>{{item.meta.title}}</span></span>
                    </a-menu-item>
                    <a-sub-menu :key="item.path" v-else>
                        <template #title>
                            <span><span class="anticon"><i class="iconfont" :class="item.meta && item.meta.icon"></i></span><span>{{item.meta.title}}</span></span>
                        </template>
                        <a-menu-item v-for="v in item.children" :key="v.path">
                            <i class="iconfont" :class="v.meta && v.meta.icon"></i>
                            {{v.meta.title}}
                        </a-menu-item>
                    </a-sub-menu>
                </template>
        </a-menu>
    </a-layout-sider>
</template>
<script lang='ts'>
import { IGlobalState } from '@/store'
import { useRouter, Router } from  'vue-router'
import { computed, defineComponent } from 'vue';
import * as Types from '@/store/action-types';
import { useStore, Store } from 'vuex';
import routes from '@/router/index';
// 菜单设置
function useSetting(store: Store<IGlobalState>, router: Router) {
    const isCollapse = computed(() => store.state.setting.isCollapse);
    const activeMenu = computed(() => store.state.setting.activeMenu);
    const theme = computed(() => store.state.setting.theme);
    // 设置主题
    function setTheme(theme: string) {
        store.commit(`setting/${Types.SET_THEME}`, theme);
    }
    function setActiveMenu(activeMenu: any) {
        const { keyPath } = activeMenu;
        debugger
        const path = keyPath.reverse().join('/');
        router.push(path);
        store.commit(`setting/${Types.SET_ACTIVEMENU}`, keyPath);
    }
    return {
        isCollapse,
        activeMenu,
        theme,
        setTheme,
        setActiveMenu
    }
}
export default defineComponent({
    setup() {
        const routers = routes.options.routes
        const router= useRouter();
        const store = useStore<IGlobalState>();
        const { isCollapse } = useSetting(store, router);
        const { activeMenu, setActiveMenu } = useSetting(store, router);
        const { theme, setTheme } = useSetting(store, router);
        return {
            isCollapse,
            activeMenu,
            theme,
            setActiveMenu,
            setTheme,
            routers
        } 
    }
})
</script>
<style lang="less">
@border-color: #55616d;
  .logo {
        padding: 0 12px;
        height: 56px;
        display: flex;
        align-items: center;
        transition: all .2s;
        box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 8%);
        h1 {
            margin-bottom: 0;
            margin-left: 10px;
            transition: all .2s;
            overflow: hidden;
            max-width: 90px;
            -webkit-transition: max-width .3s;
            transition: max-width .3s;
            white-space: nowrap;
        }
        .hideTitle {
            max-width: 0;
            -webkit-transition: max-width .3s;
            transition: max-width .3s;
            overflow: hidden;
        }
        img {
            width: 40px;
            height: 40px;
            margin-left: 7px;
            border-radius: 50%;
        }
    }
    .theme {
        .ant-menu-submenu-open {
         .ant-menu-submenu-title {
             background-color: #f7f7f9;
         }   
        }
        .ant-menu-item-selected {
            font-weight: 700 !important;
            .iconfont {
                font-weight: normal;
            }
        }
        .ant-menu-item {
            text-align: left;
        }
       .ant-menu-submenu-title {
           text-align: left;
        }
        .ant-menu-submenu {
           .ant-menu-item {
               text-align: left;
           }
        }
        .ant-menu-submenu-title:hover {
            background: #f7f7f9;
        }
        .ant-menu-sub {
            .ant-menu-item:hover {
                background: #f7f7f9;
            }
        }
    }
    .m-dark {
        .logo {
            h1 {
                color: #fff;
            }
        }
        .ant-layout {
            background-color: #2c2c43;
        }
        .ant-menu-inline-collapsed {
            border-right: none;
        }
        .ant-layout-sider-dark {
            background-color: #223;
            .ant-menu {
                background-color: #223;
                color: #a8a9bb !important;
                .ant-menu-submenu-open {
                    .ant-menu-submenu-title{
                        background-color: #223;
                    }
                }
                .ant-menu-submenu-title:hover {
                    background-color: #223;
                }
                // .ant-menu-sub {
                    .ant-menu-item:hover {
                        background: #223;
                        .iconfont {
                            color: #fff;
                        }
                    }
                // }
                .ant-menu-item-selected {
                    background: #1e1e2d;
                }
            }
            .ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after {
                background: #a8a9bb !important;
            }
            .ant-menu-inline {
                border-right: none;
            }
        }
    }
</style>