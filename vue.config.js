module.exports = {
    outputDir: 'build',
    devServer: {
        proxy: {
            '/admin': {    // search为转发路径
                target: 'http://dev.api.codingbing.com:9100',  // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true  // 设置同源  默认false，是否需要改变原始主机头为目标URL,
            }
        },
        port: 8080, // 端口号
        // host: '0.0.0.0',
        // https: false, // https:{type:Boolean}
        // open: true, //配置自动启动浏览器
    }
}