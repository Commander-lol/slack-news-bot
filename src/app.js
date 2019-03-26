const app = new (require('koa'))
const body = require('koa-bodyparser')
const logger = require('koa-logger')

const router = require('http/routes')

app.use(logger())
app.use(body())

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app