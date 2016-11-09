'use strict'

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        path.join(srcPath, 'less/main.less'),
        path.join(srcPath, 'index.js')
    ],
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "",
        filename: '/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!' +
                    'less?sourceMap'
                )
            },
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('/main.css'),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: path.join(srcPath, 'data'), to: 'data' }
        ])
    ],

    debug: true,
    devServer: {
        contentBase: './dist',
        port: 3000
    }
}
