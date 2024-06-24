import { esbuildPluginVersionInjector } from "esbuild-plugin-version-injector"
import { defineConfig } from "tsup"

export default defineConfig({
	platform: "node",
	target: "esnext",
	minify: true,
	splitting: false,
	external: [],
	noExternal: [],
	skipNodeModulesBundle: true,
	keepNames: true,
	dts: true,
	clean: true,
	shims: false,
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	sourcemap: true,
	esbuildPlugins: [esbuildPluginVersionInjector()],
})
