<template>
    <a-layout-header class="t_header">
        <menu-unfold-outlined
          v-if="isCollapse"
          class="trigger"
          @click="() => setIsCollapse(false)"/>
        <menu-fold-outlined v-else class="trigger" @click="() => setIsCollapse(true)" />
        <div class="r-header">
            <i class="iconfont" :class="theme === 'dark' ? 'icon-sun': 'icon-moon'" @click="() => setTheme(theme === 'dark' ? 'light' : 'dark')"></i>
            <!-- 切换国际化 -->
            <a-dropdown :trigger="['click']" placement="bottomCenter">
                <div class="ant-dropdown-link">
                    <GlobalOutlined />
                    <span>简体中文</span>
                    <!-- <a-icon type="down" /> -->
                </div>
                <template #overlay>
                    <a-menu @click="changeLanguage">
                        <a-menu-item key="0">
                            <span>简体中文</span>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <span>English</span>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <!-- 退出操作 -->
            <a-dropdown class="log_info"
            :trigger="['click']"
            overlayClassName="t-drop">
                <div class="ant-dropdown-link">
                    <!-- <img src="../../../assets/user.jpg" alt=""> -->
                    <span>Hi, user123</span>
                    <DownOutlined />
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="2" @click="logoutChange">
                            <LogoutOutlined/>退出
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>
<script lang='ts'>
import { IGlobalState } from '@/store';
import { useRouter, Router } from  'vue-router';
import { computed, defineComponent } from 'vue';
import * as Types from '@/store/action-types';
import { useStore, Store } from 'vuex';
import { logout } from '@/server/login';
import { MenuUnfoldOutlined, MenuFoldOutlined, GlobalOutlined, LogoutOutlined, DownOutlined} from '@ant-design/icons-vue';
// 菜单设置
function useSetting(store: Store<IGlobalState>, router: Router) {
    const isCollapse = computed(() => store.state.setting.isCollapse);
    const theme = computed(() => store.state.setting.theme);
    function setIsCollapse(isCollapse: boolean) {
        store.commit(`setting/${Types.SET_COLLAPSE}`, isCollapse);
    }
    function setTheme(theme: string) {
        store.commit(`setting/${Types.SET_THEME}`, theme);
        document.body.className = `m-${theme}`
    }
    // 退出登录
    const logoutChange = async() => {
        const { data } = await logout();
        if (data.code === 200) {
            router.push('/login');
            store.commit(`login/${Types.TOKENINFO}`, '')
        }
    }
    document.body.className = `m-${theme.value}`;
    return {
        isCollapse,
        theme,
        setIsCollapse,
        setTheme,
        logoutChange
    }
}
export default defineComponent({
    name: 'header',
    components: {
        DownOutlined,
        LogoutOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        GlobalOutlined
    },
    setup() {
        const store = useStore<IGlobalState>();
        const router = useRouter();
        const {isCollapse ,theme, logoutChange, setTheme, setIsCollapse} = useSetting(store, router);
        // 切换语言
        const changeLanguage = () => {
            console.log('切换语言')
        }
        return {
            changeLanguage,
            setIsCollapse,
            setTheme,
            logoutChange,
            isCollapse,
            theme
        }
    }
});
</script>
<style lang="less" scoped>
    @import 'header.less';
</style>