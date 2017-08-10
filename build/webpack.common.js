'use strict';

const path = require('path');

module.exports = {
    output: {
        path: path.join(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: [/\.(spec|e2e)\.ts$/],
            use: [
                'awesome-typescript-loader'
            ]
        }, {
            test: /\.css$/,
            use: ['to-string-loader', 'css-loader']
        }, {
            test: /\.(jpg|png|gif)$/,
            use: 'file-loader'
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        }]
    },
    watchOptions: {
        // Don't check in node_modules for changes
        ignored: /node_modules/
    }
}