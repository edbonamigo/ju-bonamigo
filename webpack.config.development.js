const path = require('path')

const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		devMiddleware: {
			publicPath: '/public',
			writeToDisk: true,
		},
		client: {
			logging: 'none',
		},
	},

	output: {
		path: path.resolve(__dirname, 'public'),
	},
})
