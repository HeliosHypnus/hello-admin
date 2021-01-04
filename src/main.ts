import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue';
import '../public/iconfont/iconfont.css';
createApp(App).use(Antd).use(store).use(router).mount('#app')
