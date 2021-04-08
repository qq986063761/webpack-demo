const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',
  output: {
    ...baseConfig.output,
    filename: '[name][chunkhash].js'
  },
  module: {
    rules: [
      ...baseConfig.module.rules.slice(),
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
    ...baseConfig.plugins.slice(),
    // mini-css-extract-plugin：拆分 css 文件，4.0 以前的 webpack 版本用 extract-text-webpack-plugin
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ]
})