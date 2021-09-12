const publishStorage = require('../../service/article/publishArticle')

const publishArticleRes = async (ctx, next) => {
    const result = await publishStorage(ctx)
    ctx.body = result
}

module.exports = publishArticleRes
