import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import sass from 'sass'

const IS_DEVELOPMENT = process.env.NOVE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')
const dirStyles = path.join(__dirname, 'styles')
const disNode = 'node_modules'

const config = {
	entry: [
		path.join(dirApp, 'index.js'), //
		path.join(dirStyles, 'index.scss'),
	],
	resolve: {
		modules: [
			dirApp, //
			dirAssets,
			dirStyles,
			disNode,
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			IS_DEVELOPMENT,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './assets',
					to: '',
					noErrorOnMissing: true,
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: sass,
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
				loader: 'file-loader',
				options: {
					name(file) {
						return '[name].[ext]'
					},
				},
			},
			// You need this, if you are using `import file from "file.ext"`, for `new URL(...)` syntax you don't need it
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset',
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: 'raw-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: 'glslify-loader',
				exclude: /node_modules/,
			},
		],
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
}

export default config
