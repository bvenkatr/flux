module.exports = {
	entry: {
		"flux": "./src/index.js",
		"example": "./example/example.js"
	},
	output: {
		path: "dist",
		filename: "[name].js",
		libraryTarget: 'umd',
		library: "[name]"
	},
	externals: {
		"@nsisodiya/flux": {
			commonjs: '@nsisodiya/flux',
			commonjs2: '@nsisodiya/flux',
			amd: 'flux',
			root: 'flux'
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel",
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};