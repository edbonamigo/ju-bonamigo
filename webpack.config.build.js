const path = require('path')

const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
	mode: 'production',

	output: {
		path: path.join(__dirname, 'dist'),
	},

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			// We recommend using only for the "production" mode
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							'imagemin-gifsicle',
							'imagemin-mozjpeg',
							'imagemin-pngquant',
							'imagemin-svgo',
						],
					},
				},
			}),
		],
	},
})
