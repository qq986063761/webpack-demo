const baseConfig = require('./webpack.base.js')

module.exports = Object.assign({}, baseConfig, {
  mode: 'production'
})