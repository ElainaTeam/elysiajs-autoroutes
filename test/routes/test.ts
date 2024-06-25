export default (app: ElysiaApp) => {
	app.get("/", () => {
		return "Hello API"
	})
}
