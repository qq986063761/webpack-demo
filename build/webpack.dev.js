const baseConfig = require('./webpack.base.js')

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  // 热更新监听
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 忽略监听的文件
    aggregateTimeout: 200, // 监听到变化后执行更新前的等待时间 ms
    poll: 1000 // 轮训访问文件是否变化，每秒访问多少次
  }
})