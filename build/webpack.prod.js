const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    entry: {
        'index': './src/logger.ts'
    },
    output: {
        library: "Logger",
        libraryTarget: "umd",
        filename: "[name].js",
        sourceMapFilename: '[name].map',
        auxiliaryComment: {
            root: "Root Logger",
            commonjs: "CommonJS Logger module",
            commonjs2: "CommonJS2 Logger module",
            amd: "AMD Logger module"
        }
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
});
