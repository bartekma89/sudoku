const path = require('path');

module.exports = {
	entry: './src/index.jsx',

	output: {
		publicPath: '/build/',
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
};
1;
