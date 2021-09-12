const connection = require('../../app/database')

const publishStorage = async (ctx) => {
    let statement
    const { form, isChange } = ctx.request.body
    const {article_id, user_id, article_title, classify_id, article_photo, article_abstract, article_content } = form
    if (isChange) {
        statement = `UPDATE articles SET article_title='${article_title}', classify_id='${classify_id}', article_photo='${article_photo}', article_abstract='${article_abstract}', article_content='${article_content}'
                     WHERE ${article_id} = articles.article_id;`
    } else {
        const date = dateDeal(Date.now())
        statement = `INSERT INTO articles (user_id, article_createTime, article_title, article_photo, article_content, article_abstract, classify_id, article_like_count)
                     VALUES ('${user_id}', '${date}', '${article_title}', '${article_photo}', '${article_content}','${article_abstract}', '${classify_id}', 0);`
    }
    const result = await connection.execute(statement)
    return result[0]
}

const dateDeal = (timestamp) => {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hours = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    if (month < 10) { month = '0' + month }
    if (date < 10) { date = '0' + date }
    if (hours < 10) { hours = '0' + hours }
    if (minute < 10) { minute = '0' + minute }
    if (second < 10) { second = '0' + second }
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}

module.exports = publishStorage
