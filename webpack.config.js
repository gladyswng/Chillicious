const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');


module.exports = {
    entry : './frontend/src/index.tsx',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    resolve: {extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx']},
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
        historyApiFallback: true,
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'frontend/public/index.html',
            // apiUrl: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}`
        })

    ]

}
