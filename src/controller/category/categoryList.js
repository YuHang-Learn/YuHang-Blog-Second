const { categoryListSearch, categoryDataSearch} = require('../../service/category/categoryList')

const categoryListRes = async (ctx, next) => {
  const result = await categoryListSearch(ctx)
  ctx.body = result
}

const categoryDataRes = async (ctx, next) => {
  const result = await categoryDataSearch(ctx)
  ctx.body = result
}

module.exports = {
  categoryListRes,
  categoryDataRes
}
