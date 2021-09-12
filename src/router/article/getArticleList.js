const Router = require('koa-router')

const { articleListRes, filterArticleListRes} = require('../../controller/article/articleList')
const tokenHandle = require('../../app/tokenHandle')

const articleRouter = new Router()

articleRouter.get('/articleList',tokenHandle, articleListRes)

articleRouter.get('/filterArticleList',tokenHandle, filterArticleListRes)

module.exports = articleRouter
