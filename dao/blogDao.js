const dbutil = require('./dbUtil')

function insertBlog (title,content,views,tags,ctime,utime,success) {
    const insertSql = 'insert into blog(`title`,`content`,`views`,`tags`,`ctime`,`utime`) values(?,?,?,?,?,?);'
    const params = [title,content,views,tags,ctime,utime]
    const connection = dbutil.connect()
    connection.query(insertSql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogByTag () {

}
function queryBlogById (bId, success) {
    const querySql = 'select * from blog where id = ?'
    const params = [bId]
    const connection = dbutil.connect()
    connection.query (querySql, params, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            success(result)
        }
    })
}
function queryBlogByPage(page, pageSize, success) {
    const querySql = 'select * from blog order by id desc limit ?, ?;'
    const params = [page * pageSize, pageSize]
    const connection = dbutil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err ) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryBlogCount(success) {
    const querySql = 'select count(1) as count from blog ;'
    const params = []
    const connection = dbutil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err ) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}

function queryAllBlog (success) {
    const querySql = 'select * from blog'
    const params = []
    const connection = dbutil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err ) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function addViews (id, success) {
    const querySql = 'update blog set views = views + 1 where id = ?'
    const params = [id]
    const connection = dbutil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err ) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
function queryHotBlog (size,success) {
    const querySql = 'select * from blog order by views desc limit ?'
    const params = [size]
    const connection = dbutil.connect()
    connection.query(querySql, params, function (err, result) {
        if (err ) {
            console.log(err)
        } else {
            success(result)
        }
    })
    connection.end()
}
module.exports.queryAllBlog = queryAllBlog
module.exports.insertBlog = insertBlog
module.exports.queryBlogByPage = queryBlogByPage
module.exports.queryBlogCount = queryBlogCount
module.exports.queryBlogById = queryBlogById
module.exports.addViews = addViews
module.exports.queryHotBlog = queryHotBlog
