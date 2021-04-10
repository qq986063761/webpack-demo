
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  getMPA() {
    const entry = {}
    const htmlWebpackPlugins = []
    // 获取文件路径
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