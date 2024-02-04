const HtmlWebpackPlugin = require('html-webpack-plugin');
const {Cleanwebpackplugin, CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/Index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].bundle.js',
    },
    devServer: {
        port: 4200,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/Index.html'),
        }) ,
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}

