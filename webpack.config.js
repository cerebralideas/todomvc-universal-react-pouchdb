const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
	mode: argv.mode,
	entry: './app/index.client.js',
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new webpack.DefinePlugin({
			WEBPACK_ENV: JSON.stringify(argv.mode)
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					'css-loader'
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js'
	}
});
