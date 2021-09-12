const mysql = require('mysql2')

const connection = mysql.createPool({
    host     : 'localhost',   // 数据库地址
    user     : 'root',    // 数据库用户
    password : 'yuhang9136.',   // 数据库密码
    database : 'yuhang_blog',  // 选中数据库
    connectionLimit: 10,
    port: 3306
})

connection.getConnection(((err, connection1) => {
    if (!err) {
        console.log('数据库连接成功！')
    } else {
        console.log('数据库连接失败！')
        console.log(err)
    }
}))

module.exports = connection.promise()
