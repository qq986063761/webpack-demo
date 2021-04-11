const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name]/[name][chunkhash].js' // 多页面多配置了一个 '[name]/'
  },
  module: {
    rules: [
      // 加载 css 转换成 js 代码
      // style-loader 生成 style 标签代码加到 head 标签中
      // postcss-loader、autoprefixer：添加 css 兼容属性
      {
        test: /\.css$/,
        // MiniCssExtractPlugin.loader 和 'style-loader' 冲突不能共用
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          // 要配合 postcss.config.js 和 package.json 中 browserslist 配置才生效
          'postcss-loader'
        ]
      },
      // 编译 scss 代码
      // 解析 less 可以用 less、less-loader
      {
        test: /\.scss$/,
        // 'style-loader'
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader',
          'postcss-loader'
        ]
      },
      // 资源文件解析
      // file-loader、url-loader：解析资源文件、路径
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name][hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // mini-css-extract-plugin：拆分 css 文件，4.0 以前的 webpack 版本用 extract-text-webpack-plugin
    new MiniCssExtractPlugin({
      filename: '[name]/[name][contenthash].css' // 多页面多配置了一个 '[name]/'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 可以自己最后监听一下错误用于上报
    function() {
      this.hooks.done.tap('done', stats => {
        //  && process.argv.indexOf('--watch') === -1
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log('build error')
          process.exit(1)
        } else {
          console.log('build success')
        }
      })
    }
  ]
})