import path from "path"
import { fileURLToPath } from "url"

import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import { includeIgnoreFile } from "@eslint/compat"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
	includeIgnoreFile(path.resolve(__dirname, ".gitignore")),
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					args: "none",
					caughtErrors: "all",
					ignoreRestSiblings: false,
				},
			],
			"no-useless-escape": "off",
			"no-case-declarations": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
]
