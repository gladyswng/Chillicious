const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry : './src/index.tsx',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    resolve: {extensions: ['.ts', '.tsx','.js', '.jsx', '.react.js']},
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
    
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'public/index.html',
        }),
        new Dotenv()
    ]

}
