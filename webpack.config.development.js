const path = require('path')

const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(config, {
	mode: 'development',

	cache: false,

	devtool: 'inline-source-map',

	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000,
		client: {
			logging: 'none',
		},
		hot: true,
	},

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
})
