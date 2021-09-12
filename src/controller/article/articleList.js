const { articleSearch, filterArticleSearch} = require('../../service/article/articleList')

const articleListRes = async (ctx, next) => {
  const result = await articleSearch(ctx)
  ctx.body = result
}

const filterArticleListRes = async (ctx, next) => {
  const result = await filterArticleSearch(ctx)
  ctx.body = result
}

module.exports = {
  articleListRes,
  filterArticleListRes
}
