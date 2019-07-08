const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
	mode: argv.mode,
	entry: './app/index.client.js',
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	plugins: [
		new webpack.DefinePlugin({
			WEBPACK_ENV: JSON.stringify(argv.mode)
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
});
