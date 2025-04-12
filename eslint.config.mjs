import plugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser,
			parserOptions: {
				project: "./tsconfig.json",
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": plugin,
			prettier: prettierPlugin,
		},
		rules: {
			// TypeScript rules
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-function-return-type": "warn",

			// Prettier rules
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
					useTabs: true,
					semi: true,
					trailingComma: "all",
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: "auto",
				},
			],
		},
	},
];
