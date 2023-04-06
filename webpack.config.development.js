const path = require('path')

const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
	mode: 'development',

	cache: false,

	devtool: 'source-map',

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
