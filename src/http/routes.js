const Router = require('koa-router')
const routes = new Router()

routes.get('/api', ctx => {
	ctx.body = `<DOCTYPE html>
	<html>
		<body>
			<section>
				<h2>/receive</h2>
				<p>Send a new news article for storage</p>
			</section>
		</body>
	</html>`
})

routes.post('/receive', async ctx => {
	const scraper = require('utils/scraper')
	const payload = ctx.request.body
	const { team_id, user_id, user_name, text } = payload
	await scraper.extractOpenGraph(text.trim())
	
})

module.exports = routes