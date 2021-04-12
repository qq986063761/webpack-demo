const { merge } = require('webpack-merge')
const proConfig = require('./webpack.pro.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(proConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})