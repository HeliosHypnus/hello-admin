<template>
    <div class="login">
        <div class="login-module">
            <div class="l-logo">
                <img src="../assets/logo.png" alt />
                <h3>Hello Admin</h3>
            </div>
            <div class="l-form">
                <a-form :model="userInfo" @submit.prevent="handleSubmit" v-bind="formItemLayout">
                    <a-form-item>
                        <a-input v-model:value="userInfo.username" placeholder="Username">
                            <template #prefix>
                                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                            v-model:value="userInfo.password"
                            type="password"
                            placeholder="Password"
                        >
                            <template #prefix>
                                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <div class="p-password">
                        <a-checkbox
                            :checked="checked"
                            @change="change">
                            自动登录
                        </a-checkbox>
                        <div class="forget-password primary-color">忘记密码</div>
                    </div>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            :disabled="userInfo.username === '' || userInfo.password === ''"
                        >登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { IGlobalState } from '@/store';
import { useRouter } from 'vue-router';
import { login } from '@/server/login';
import * as Types from '@/store/action-types';
declare const window: Window & { less: any };

export default defineComponent({
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const store = useStore<IGlobalState>();
        const router = useRouter();
        const state = reactive({
            userInfo: {
                username: '',
                password: ''
            },
            formItemLayout: {
                labelCol: { span: 0 },
                wrapperCol: { span: 24 }
            },
            checked: false
        });
        const handleSubmit = async() => {
            const { data } = await login(state.userInfo);
            if (data.code === 200) {
                router.push('/index');
                store.commit(`login/${Types.TOKENINFO}`, data.data);
            }
            // window.less.modifyVars({
            //     '@primary-color': color,
            //     '@link-color': color,
            //     '@btn-primary-bg': color
            // });
        };
        // 自动登录选择
        const change = () => {
            state.checked = !state.checked
            console.log(state.checked)
        }
        return {
            ...toRefs(state),
            handleSubmit,
            change,
            router
        };
    },
});
</script>
<style lang="less" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100vh;
    .login-module {
        box-shadow: 0px 2px 13px 1px rgba(0, 0, 0, 0.1);
        width: 430px;
        padding: 1vw 0px;
        box-sizing: border-box;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .l-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 30px;
            img {
                width: 45px;
                display: block;
                height: 44px;
                margin-right: 20px;
            }
            h3 {
                font-size: 32px;
                margin-bottom: 0;
            }
        }
        .l-form {
            width: 80%;
            margin: 0 auto;
            margin-top: 60px;
            .p-password {
                display: flex;
                justify-content: space-between;
                .forget-password {
                    cursor: pointer;
                    transition: all .3s;
                }
                .forget-password:hover {
                    opacity: 0.6;
                }
            }
            button {
                margin-top: 30px;
                width: 100%;
                margin-bottom: 20px;
            }
        }
    }
}
</style>
