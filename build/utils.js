
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 获取多页面打包配置
  getMPA() {
    const entry = {}
    const htmlWebpackPlugins = []
    // 获取 pages 下的所有带 index.js 文件的路径
    const files = glob.sync(path.join(__dirname, '../pages/*/index.js'))
    files.forEach(str => {
      const key = str.split('pages/')[1].split('/index.js')[0]
      entry[key] = `./pages/${key}/index.js`
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: `./pages/${key}/index.html`,
        filename: `${key}/index.html`,
        chunks: [key]
      }))
    })
  
    return {
      entry,
      htmlWebpackPlugins
    }
  }
}