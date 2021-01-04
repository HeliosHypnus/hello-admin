const path = require ('path');

const {generateTheme, getLessVars} = require ('antd-theme-generator');
const options = {};
generateTheme ({
  antDir: path.join (__dirname, './node_modules/ant-design-vue'), //node_modules中antd的路径
  stylesDir: path.join (__dirname, './src/styles'), //styles对应的目录路径
  varFile: path.join (__dirname, './src/styles/variables.less'), //less变量的入口文件
  mainLessFile: path.join(__dirname, './src/styles/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background',
    '@table-row-hover-bg'
  ], //您要动态更改的变量列表
  indexFileName: 'index.html',
  outputFilePath: path.join (__dirname, './public/color.less'), //生成的color.less文件的位置
  customColorRegexArray: [/^color\(.*\)$/],
})
  .then (res => {
    console.log ('配置主题成功');
  })
  .catch (res => {
    console.log ('配置主题失败');
  });