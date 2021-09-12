const Koa = require('koa')

const app = new Koa()

const articleRouter = require('../router/article/getArticleList')
const categoryRouter = require('../router/category/getCategoryList')
const loginRouter = require('../router/login/login')
const publishRouter = require('../router/article/publishArticle')
const { errorHandle } = require('./errorHandle')

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
  ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  await next()
})

app.use(articleRouter.routes())
app.use(articleRouter.allowedMethods())

app.use(categoryRouter.routes())
app.use(categoryRouter.allowedMethods())

app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

app.use(publishRouter.routes())
app.use(publishRouter.allowedMethods())

app.on('error', errorHandle)
module.exports = app
