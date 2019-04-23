const dbutil = require('./dbUtil')

function insertTag (tag, ctime, utime, success) {
    const insertSql = 'insert into tags(`tag`,`ctime`,`utime`) values(?, ?, ?)'
    const params = [tag, ctime, utime]
    const connection = dbutil.connect()
    connection.query(insertSql, params, function (err, result) {
        if (err){
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryTag (tag, success) {
    const querySql = 'select * from tags where tag = ?'
    const params = [tag]
    const connection = dbutil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
module.exports.insertTag = insertTag
module.exports.queryTag = queryTag
