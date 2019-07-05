const path = require('path');

module.exports = {
	entry: './app/client.js',
	resolve: {
		extensions: ['', '.js', '.jsx', '.json']
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};
