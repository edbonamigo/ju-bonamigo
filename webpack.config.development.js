import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import { merge } from 'webpack-merge'
import config from './webpack.config.js'

const configDev = merge(config, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		devMiddleware: {
			publicPath: '/public',
			writeToDisk: true,
		},
	},

	output: {
		path: path.resolve(__dirname, 'public'),
	},
})

export default configDev
