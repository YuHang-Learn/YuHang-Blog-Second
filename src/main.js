const app = require('./app/index')
const connection = require('./app/database')

app.listen(8081, () => {
    console.log('服务器启动成功！')
})
