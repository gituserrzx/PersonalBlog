const dbutil = require('./dbUtil')

function editEveryDay (content, ctime, success) {
    const connection = dbutil.connect()
    const insertSql = 'insert into every_day(`content`, `ctime`) values(?, ?);'
    const params = [content, ctime]
    connection.query(insertSql, params, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            success(res)
        }
    })
    connection.end()
}
function queryEveryDay (success) {
    const connection = dbutil.connect()
    const querySql = 'select * from every_day order by id desc limit 1;'
    const params = []
    connection.query(querySql, params, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            success(res)
        }
    })
    connection.end()
}

module.exports.editEveryDay = editEveryDay
module.exports.queryEveryDay = queryEveryDay
