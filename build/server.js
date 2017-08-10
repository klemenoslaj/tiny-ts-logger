"use strict";

const path = require('path');
const Webpack = require("webpack");
const WebpackDevServer = require("../node_modules/webpack-dev-server/lib/Server");
const webpackConfig = require(`./webpack.${process.env.NODE_ENV}.js`)

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	stats: {
		colors: true
	},
	historyApiFallback: true,
	watchOptions: { aggregateTimeout: 300 },
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
	}
});

compiler.plugin('compile', function () {
  process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
});

server.listen(8080);
