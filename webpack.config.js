const path = require('path')

module.export = {
  mode: 'production', // development
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist')
  }
}