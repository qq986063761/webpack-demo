const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  // 主要负责编译文件
  module: {
    rules: [
      // babel 用于编译 es6 成 es5
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 编译 vue 代码 vue-style-loader
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  // 负责额外处理文件
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['main']
    })
  ],
  // 配置模块解析相关
  resolve: {
    // 文件别名，项目内全局可通过别名快捷访问
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}