const Router = require('koa-router')
const publishArticleRes = require('../../controller/article/publishArticle')
const publishRouter = new Router()

publishRouter.post('/publish', publishArticleRes)

module.exports = publishRouter
