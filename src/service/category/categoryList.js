const connection = require('../../app/database')

const categoryListSearch = async  (ctx) => {
  const statement = `select classify_name from classifies`
  const result = await connection.execute(statement)
  const res = []
  for (let i of result[0]) {
    res.push(i.classify_name)
  }
  return res
}

const categoryDataSearch = async (ctx) => {
  const { page, perPage, path } = ctx.request.query
  let statement
  if (path.includes('article_manage')) {
    statement = `select articles.article_title, articles.user_id, classifies.classify_id, classifies.classify_name, classifies.classify_alias
       from articles, classifies, users 
       where classifies.classify_id = articles.classify_id
       && articles.user_id = users.user_id
       && ${ctx.user_id} = articles.user_id;`
  } else {
    statement = `select articles.article_title, articles.user_id, classifies.classify_id, classifies.classify_name, classifies.classify_alias
       from articles, classifies 
       where classifies.classify_id = articles.classify_id;`
  }
  const result = await connection.execute(statement)
  const start = (page - 1) * perPage
  const end = start + perPage
  if (start >= result[0].length) {
    return {'data': result[0], 'count': result[0].length }
  }
  if (end >= result[0].length) {
    const newRes = {
      'data': result[0].slice(start, result[0].length),
      'count': result[0].length
    }
    return newRes
  }
  const newRes = {
    'data': result[0].slice(start, end),
    'count': result[0].length
  }
  return newRes
}

module.exports = {
  categoryListSearch,
  categoryDataSearch
}
