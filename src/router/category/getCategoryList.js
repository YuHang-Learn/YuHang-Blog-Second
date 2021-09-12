const Router = require('koa-router')

const { categoryListRes, categoryDataRes } = require('../../controller/category/categoryList')
const tokenHandle = require('../../app/tokenHandle')

const categoryListRouter = new Router()

categoryListRouter.get('/categoryList',tokenHandle, categoryListRes)
categoryListRouter.get('/categoryData',tokenHandle, categoryDataRes)

module.exports = categoryListRouter
