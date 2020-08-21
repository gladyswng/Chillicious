const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge (common, {
    mode:'development',
    devtool: 'source-map',
    
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        historyApiFallback: true,
        public: process.env.proxyhost ? process.env.proxyhost : '',
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
              pathRewrite: {'^/api' : ''}
            }
          }      
    }
    

})
