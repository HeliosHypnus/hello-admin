<template>
  <div id="nav">
    <a-config-provider :locale="locale" id="app">
      <router-view/>
    </a-config-provider>
  </div>
</template>
<script lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import {defineComponent, reactive, toRefs} from 'vue';
export default defineComponent({
  components: {
    'a-config-provider': ConfigProvider
  },
  setup() {
    const state = reactive({
      locale: zhCN
    });
    return {
       ...toRefs(state)
    }
  }
})
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  // padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
