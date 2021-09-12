const Router = require('koa-router')
const loginRes = require('../../controller/login/login')

const loginRouter = new Router()

loginRouter.post('/login', loginRes)

module.exports = loginRouter
