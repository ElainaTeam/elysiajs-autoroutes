import path from "path"

const replacements = [
	{ regex: /\.(ts|tsx|js|jsx|mjs|cjs)$/u, replacement: "" },
	{ regex: /\\/gu, replacement: "/" },
	{ regex: /\[\.\.\..*\]/gu, replacement: "*" },
	{ regex: /\[(.*?)\]/gu, replacement: ":$1" },
	{ regex: /\]-\[/gu, replacement: "-:" },
	{ regex: /\]\//gu, replacement: "/" },
	{ regex: /\[/gu, replacement: "" },
	{ regex: /\]/gu, replacement: "" },
	{ regex: /\/?index$/, replacement: "" },
	{ regex: /^(?!\/$)(.*?)(\/)$/, replacement: "$1" },
]

export function transformToURL(path: string) {
	return replacements.reduce(
		(prev, { regex, replacement }) =>
			prev.replace(regex, replacement as any),
		path,
	)
}

export function getPath(dir: string) {
	if (path.isAbsolute(dir)) return dir
	if (path.isAbsolute(process.argv[1]))
		return path.join(process.argv[1], "..", dir)

	return path.join(process.cwd(), process.argv[1], "..", dir)
}

export function removeTrailingSlash(input: string) {
	return input.replace(/^(?!\/$)(.*?)(\/)$/, "$1")
}
