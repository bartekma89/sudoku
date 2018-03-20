const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const webpack = require('webpack');

let env = process.env.NODE_ENV || 'development';

let plugins = [
	new HtmlWebpackPlugin({
		template: './index.html',
		filename: 'index.html',
		inject: 'body',
	}),
];

console.log('NODE_ENV: ', env);

if (env === 'production') {
	plugins.push(
		new UglifyJsPlugin(),
		new OptimizeJsPlugin({
			sourceMap: false,
		})
	);
}

module.exports = {
	entry: ['react-hot-loader/patch', './index.jsx'],

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		hot: true,
	},

	devtool: 'eval',

	output: {
		publicPath: '/build',
		path: path.resolve(__dirname, 'build/'),
		filename: 'app.bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
		],
	},

	plugins: plugins,
};
