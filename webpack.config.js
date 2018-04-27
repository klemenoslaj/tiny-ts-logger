const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/lib/index.ts'),
    output: {
        filename: './dist/index.js',
        path: __dirname,
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};