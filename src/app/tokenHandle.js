const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const errorType = require('../constant/errorType')
const tokenHandle = async(ctx, next) => {
    if (ctx.request.url !== '/login') {
        const authorization = ctx.request.header.authorization
        if (!authorization) {
            if (ctx.request.query.path.includes('article_manage')) {
                const error = new Error(errorType.UNAUTHORIZATION)
                return ctx.app.emit('error', error, ctx)
            } else {
                await next()
            }
        } else {
            const token = authorization.replace('Bearer ', '')
            try {
                const result = jwt.verify(token, PUBLIC_KEY, {
                    algorithms: ['RS256']
                })
                if (!result.user_name) {
                    const error = new Error(errorType.UNAUTHORIZATION)
                    return ctx.app.emit('error', error, ctx)
                } else {
                    ctx.user_id = result.user_id
                    await next()
                }
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        await next()
    }
}

module.exports = tokenHandle
