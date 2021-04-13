const path = require('path')
const webpack = require('webpack')

// 用于提取公用包
module.exports = {
  mode: 'production',
  entry: {
    library: [
      'vue'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'library'),
    library: '[name]'
  },
  plugins: [
    // 利用插件生成公用包
    new webpack.DllPlugin({
      name: '[name][hash]',
      path: path.join(__dirname, 'library/[name].json')
    })
  ]
}