import { kebabCase } from 'lodash'
import { createApp } from 'vue'
// import { createFromIconfontCN } from '@ant-design/icons-vue'
// import { StaticConfig } from '@/config/app'
// iconfont的使用姿势: 2x.antdv.com/components/icon-cn/#components-icon-demo-use-iconfont.cn
// const IconFont: any = createFromIconfontCN({
//   scriptUrl: StaticConfig.IconfontURL
// })
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    function validateFileName(str: string) {
        return /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1)) || '';
    }
/**
 * @description 自动将 ./src/components/ 下的组件注册成为全局组件
 * @param {vue} app 当前应用实例
 * @returns {void} void
 */
export function registeComponent(
    app: ReturnType<typeof createApp>
): void {
    const files = require.context('./', true, /\.(vue|ts)$/)
  // 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
    files.keys().forEach(filePath => {
        const componentConfig = files(filePath);
        const fileName = validateFileName(filePath);
        const componentName = fileName.toLowerCase() === 'index' ? capitalizeFirstLetter(componentConfig.default.name) : fileName;
        app.component(componentName, componentConfig.default || componentConfig);
    });
  
//   files.keys().forEach(key => {
//     const config = files(key)
//     const name = kebabCase(key.replace(/^\.\//, '').replace(/\.\w+$/, ''))
//     app.component(name, config.default || config)
//   })
}
