const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { getMPA } = require('./utils.js')

const srcPath = path.resolve(__dirname, '../src')
// 多页面配置
const { entry, htmlWebpackPlugins } = getMPA()

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js' // 如果多页面要在前面多配置一个 [name]/ 让打包后的文件分到指定文件夹
  },
  // 主要负责编译文件
  module: {
    rules: [
      // babel 用于编译 es6 成 es5
      {
        test: /\.jsx?$/,
        include: srcPath,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true // 开启缓存
            }
          },
          'eslint-loader'
        ]
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
    new FriendlyErrorsWebpackPlugin(), // 能在控制台输出友好的日志
    new VueLoaderPlugin(),
    ...htmlWebpackPlugins
  ],
  // 配置模块解析相关
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    // 文件别名，项目内全局可通过别名快捷访问
    alias: {
      '@': srcPath
    },
    // 解析模块时，应该搜索的目录，可减少搜索范围提高构建速度
    modules: [
      srcPath,
      'node_modules'
    ],
    // 使用模块项目中 package.json 哪个属性作为 target 来引入，main module unpkg 等等
    mainFields: ['main']
  },
  optimization: {
    // 分割公用代码块
    splitChunks: {
      minSize: 0, // 代码大小超出范围则提取打包
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          priority: 1 // 优先级高的会优先被提取出来
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -10
        }
      }
    }
  },
  // 控制台输出内容
  stats: 'errors-only'
}