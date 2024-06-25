import Elysia from "elysia"

import { autoroutes } from "dist"

const app = new Elysia().use(
	await autoroutes({
		prefix: "/api",
		routesDir: "./routes",
	}),
)

app.listen(3000, (server) => {
	console.log(`> Elysia app is running at: ${server.url.origin}`)
})

declare global {
	type ElysiaApp = typeof app
}
