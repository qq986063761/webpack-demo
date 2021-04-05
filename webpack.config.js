const path = require('path')

module.export = {
  mode: 'production', // development
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  // 主要负责编译文件
  module: {
    rules: [
      // babel 用于编译 es6 成 es5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 负责额外处理文件
  plugins: [

  ]
}