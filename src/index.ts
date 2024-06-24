import Elysia from "elysia"
import { Glob } from "bun"
import path from "path"
import fs from "fs"

import { removeTrailingSlash, getPath, transformToURL } from "@/utils"

export type AutoroutesOptions = {
	routesDir?: string
	pattern?: string
	prefix?: string
}

export async function autoroutes(options?: AutoroutesOptions) {
	const defaultOptions: Required<AutoroutesOptions> = {
		routesDir: options?.routesDir ? getPath(options.routesDir) : "./routes",
		prefix: options?.prefix ? removeTrailingSlash(options.prefix) : "/",
		pattern: options?.pattern ?? "**/*.{ts,tsx,js,jsx,mjs,cjs}",
	}

	if (!fs.existsSync(defaultOptions.routesDir))
		throw new Error(`Directory ${defaultOptions.routesDir} doesn't exists`)
	if (!fs.statSync(defaultOptions.routesDir).isDirectory())
		throw new Error(`${defaultOptions.routesDir} isn't a directory`)

	const plugin = new Elysia({
		name: "elysiajs-autoroutes",
		prefix: defaultOptions.prefix,
		seed: Math.random().toString(32).substring(2),
	})

	const glob = new Glob(defaultOptions.pattern).scan({
		cwd: defaultOptions.routesDir,
	})

	const files = await Array.fromAsync(glob)

	for (const filePath of files) {
		const fullPath = path.join(defaultOptions.routesDir, filePath)
		const file = await import(fullPath)

		if (!file.default)
			throw new Error(`${filePath} doesn't provide default export.`)

		const url = transformToURL(filePath)

		plugin.group(url, (app) => file.default(app) ?? app)
	}

	return plugin
}
