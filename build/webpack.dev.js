const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(CommonConfig, {
    entry: {
        'main': './src/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        path: path.join(__dirname, '../docs')
    },
    devtool: 'source-map',
    devServer: {
        compress: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        })
    ]
});
