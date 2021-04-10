const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getMPA } = require('./utils.js')

// 多页面配置
const { entry, htmlWebpackPlugins } = getMPA()

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist/[name]'), // 多页面多配置了一个 '/[name]'
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
    new CleanWebpackPlugin(), // 打包前清理输出目录
    new VueLoaderPlugin(),
    ...htmlWebpackPlugins
  ],
  // 配置模块解析相关
  resolve: {
    // 文件别名，项目内全局可通过别名快捷访问
    alias: {
      '@': path.resolve(__dirname, '../pages/page1')
    }
  }
}