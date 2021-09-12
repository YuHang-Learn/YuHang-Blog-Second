const connection = require('../../app/database')

const loginVerify = async (ctx) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
        const error = new Error('用户名或密码不正确！')
        return ctx.app.emit('error', error, ctx)
    }
    const result = await loginSearch(ctx)
    if (result[0].user_email !== username && result[0].user_telephone !== username) {
        const error = new Error('未找到该用户！')
        return ctx.app.emit('error', error, ctx)
    }

    if (result[0].user_password !== password) {
        const error = new Error('密码不正确！')
        return ctx.app.emit('error', error, ctx)
    }
    return result[0]
}

const loginSearch = async (ctx) => {
    const { username } = ctx.request.body
    const statement = `select * from users
                       where '${username}' = user_email
                       || '${username}' = user_telephone;`
    const result = await connection.execute(statement)
    return result[0]
}
module.exports = loginVerify
