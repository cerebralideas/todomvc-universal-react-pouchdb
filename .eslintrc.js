module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:react/recommended', // basic rules for React
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
	],
	parserOptions: {
		'ecmaVersion': 2018, // Allows for the parsing of modern ECMAScript features
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true, // Allows for the parsing of JSX
		}
	},
	plugins: [
		'@typescript-eslint',
		'react'
	],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off"
		'@typescript-eslint/indent': ['error', 'tab' ],
		'@typescript-eslint/no-explicit-any': 0,
		'useTabs': 0
	},
	settings: {
		'react': {
			'version': 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	}
};
