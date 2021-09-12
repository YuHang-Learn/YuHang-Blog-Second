const connection = require('../../app/database')

const articleSearch = async (ctx) => {
    const { page, perPage, val = '全部', path } = ctx.request.query
    let statement
    if (path.includes('article_manage')) {
        if (val === '全部') {
            statement = `select * from articles, classifies, users
                            where articles.classify_id = classifies.classify_id
                            && users.user_id = articles.user_id
                            && ${ctx.user_id} = articles.user_id;`
        } else {
            statement = `select * from articles, classifies, users
                            where classifies.classify_id = articles.classify_id
                            && '${val}' = classifies.classify_name
                            && users.user_id = articles.user_id
                            && ${ctx.user_id} = articles.user_id;`
        }
    } else {
        if (val === '全部') {
            statement = `select * from articles, classifies
                            where articles.classify_id = classifies.classify_id;`
        } else {
            statement = `select * from articles, classifies
                            where classifies.classify_id = articles.classify_id
                            && '${val}' = classifies.classify_name;`
        }
    }
    const result = await connection.execute(statement)
    dateDeal(result[0])
    return pageSearch(page, perPage, result[0])
}

const filterArticleSearch = async (ctx) => {
    const { classifyName, date1, date2, page, perPage, path } = ctx.request.query
    let statement
    if (path.includes('article_manage')) {
        if (classifyName === '全部' || classifyName === '') {
            if (date1 === '0') {
                statement = `select * from articles, classifies, users
                             where articles.classify_id = classifies.classify_id
                             && users.user_id = articles.user_id
                             && ${ctx.user_id} = articles.user_id;`
            } else {
                statement = `select * from articles, classifies, users
                               where articles.classify_id = classifies.classify_id
                               && Date(article_createTime) >= '${date1}'
                               && Date(article_createTime) <= '${date2}'
                               && users.user_id = articles.user_id
                               && ${ctx.user_id} = articles.user_id;`
            }
        } else {
            if (date1 === '0') {
                statement = `select * from articles, classifies, users
                               where articles.classify_id = classifies.classify_id
                               && '${classifyName}' = classifies.classify_name
                               && users.user_id = articles.user_id
                                && ${ctx.user_id} = articles.user_id;`
            } else {
                statement = `select * from articles, classifies, users
                               where articles.classify_id = classifies.classify_id
                               && '${classifyName}' = classifies.classify_name
                               && Date(article_createTime) >= '${date1}'
                               && Date(article_createTime) <= '${date2}'
                               && users.user_id = articles.user_id
                               && ${ctx.user_id} = articles.user_id;`
            }
        }
    } else {
        if (classifyName === '全部' || classifyName === '') {
            if (date1 === '0') {
                statement = `select * from articles, classifies
                         where articles.classify_id = classifies.classify_id;`
            } else {
                statement = `select * from articles, classifies
                               where articles.classify_id = classifies.classify_id
                               && Date(article_createTime) >= '${date1}'
                               && Date(article_createTime) <= '${date2}';`
            }
        } else {
            if (date1 === '0') {
                statement = `select * from articles, classifies
                               where articles.classify_id = classifies.classify_id
                               && '${classifyName}' = classifies.classify_name;`
            } else {
                statement = `select * from articles, classifies
                               where articles.classify_id = classifies.classify_id
                               && '${classifyName}' = classifies.classify_name
                               && Date(article_createTime) >= '${date1}'
                               && Date(article_createTime) <= '${date2}';`
            }
        }
    }
    const result = await connection.execute(statement)
    dateDeal(result[0])
    return pageSearch(page, perPage, result[0])
}

const pageSearch = (page, perPage, result) => {
    const start = (page - 1) * perPage
    const end = start + perPage
    if (start >= result.length) {
        return {'data': result, 'count': result.length }
    }
    if (end >= result.length) {
        return  {
            'data': result.slice(start, result.length),
            'count': result.length
        }
    }
    return  {
        'data': result.slice(start, end),
        'count': result.length
    }
}

const dateDeal =  (result) => {
    for (let i = 0; i < result.length; i++) {
        const d = new Date(result[i].article_createTime)
        result[i].article_createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    }
}

module.exports = {
    articleSearch,
    filterArticleSearch
}
