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

module.exports.insertTagBlogMapping = insertTagBlogMapping
