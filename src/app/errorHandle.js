const errorType = require('../constant/errorType')

const errorHandle = (error, ctx) => {
    let status, message
    switch (error.message) {
        case errorType.USERNAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = '用户名或密码不正确！'
            break
        case errorType.USERNAME_ALREADY_EXISTS:
            status = 401
            message = '该用户名已存在'
            break
        case errorType.USERNAME_DOES_NOT_EXISTS:
            status = 402
            message = '该用户不存在'
            break
        case errorType.PASSWORD_IS_INCORRENT:
            status = 403
            message = '密码错误'
            break
        case errorType.UNAUTHORIZATION:
            status = 401
            message = 'token过期或未传'
            break
        default:
            status = 404
            message = 'Not Found'
    }
    ctx.status = status
    ctx.body = message
}

module.exports = { errorHandle }
