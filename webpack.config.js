const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry : './frontend/src/index.tsx',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    resolve: {extensions: ['.ts', '.tsx','.js', '.jsx', '.react.js']},
    devtool: 'source-map',
    module : {
        rules : [
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
            {test : /\.(js)$/, 
            exclude: /node_modules/,use:'babel-loader',
            },
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {test: /\.svg$/, use: ['@svgr/webpack', 'svg-url-loader']}
        ]

    },
    mode:'development',
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        public: 'chillicious.menu',
        proxy: {
            '/api': {
              target: 'http://localhost:3000',
              pathRewrite: {'^/api' : ''}
            }
          }      
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'frontend/public/index.html',
       
        }),
      
        new Dotenv()
   

    ]

}
