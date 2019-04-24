const dbutil = require('./dbUtil')

function insertTagBlogMapping(tag_id, blog_id, ctime, utime, success) {
    const connection = dbutil.connect()
    const insertSql = 'insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`) values(?, ?, ?, ?)'
    const params = [tag_id, blog_id, ctime, utime]
    connection.query(insertSql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogIdByTag(tag_id,page, pageSize, success) {
    const connection = dbutil.connect()
    const querySql = 'select blog_id from tag_blog_mapping where tag_id = ? limit ? , ?'
    const params = [tag_id, page * pageSize, pageSize]
    connection.query(querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogCountByTag(tag_id, success) {
    const connection = dbutil.connect()
    const querySql = 'select count(1) as count from tag_blog_mapping where tag_id = ? '
    const params = [tag_id]
    connection.query(querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
module.exports.insertTagBlogMapping = insertTagBlogMapping
module.exports.queryBlogIdByTag = queryBlogIdByTag
module.exports.queryBlogCountByTag = queryBlogCountByTag
