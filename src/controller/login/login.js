const loginVerify = require('../../service/login/login')
const { PRIVATE_KEY } = require('../../app/config')
const jwt = require('jsonwebtoken')

const loginRes = async (ctx,next) => {
    const result = await loginVerify(ctx)
    const { user_id, user_name } = result
    const token = jwt.sign({user_id, user_name}, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
        algorithm: 'RS256'
    })
    result.token = token
    ctx.body = result
}

module.exports = loginRes

