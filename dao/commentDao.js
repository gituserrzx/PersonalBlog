const dbUtil = require('./dbUtil')

function insertComment (blog_id, parent, parentName,user_name, comment, email, ctime, utime, success) {
    const insertSql = 'insert into comments(`blog_id`,`parent`,`parentName`,`user_name`,`comment`,`email`,`ctime`,`utime`) values(?,?,?,?,?,?,?,?);'
    const params = [blog_id,parent,parentName,user_name,comment,email,ctime,utime]
    const connection = dbUtil.connect()
    connection.query(insertSql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryCommentByBlogId(blog_id,success) {
    const querySql = 'select * from comments where blog_id = ?'
    const params = [blog_id]
    const connection = dbUtil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryCountByBlogId(blog_id,success) {
    const querySql = 'select count(1) as count from comments where blog_id = ?'
    const params = [blog_id]
    const connection = dbUtil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryNewComment(size, success) {
    const querySql = 'select * from comments order by id desc  limit ?'
    const params = [size]
    const connection = dbUtil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
          success(result)
        }
    })
}
module.exports.insertComment = insertComment
module.exports.queryCommentByBlogId = queryCommentByBlogId
module.exports.queryCountByBlogId = queryCountByBlogId
module.exports.queryNewComment = queryNewComment
