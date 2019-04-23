const url = require('url')
const commentDao = require('../dao/commentDao')
const timeUtil = require('../util/timeUtil')
const respUtil = require('../util/respUtil')
const captcha = require('svg-captcha')

const path = new Map()

function insertComment (req,res) {
    const params = url.parse(req.url, true).query
    commentDao.insertComment(parseInt(params.bId), parseInt(params.parent), params.parentName, params.username, params.comment,params.email,timeUtil.getNew(),timeUtil.getNew(), function(result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success','添加成功',result))
        res.end()
    })

}
function queryRandomCode(req, res) {
    const img = captcha.create({fontSize: 50, width: 100, height: 34})
    res.writeHead(200)
    res.write(respUtil.writeResult('success', '评论成功', img))
    res.end()
}
function queryCommentByBlogId(req, res) {
    const params = url.parse(req.url, true).query
    commentDao.queryCommentByBlogId(params.bId, function (result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success','成功', result))
        res.end()
    })
}
function queryCountByBlogId (req, res) {
    const params = url.parse(req.url, true).query
    commentDao.queryCountByBlogId(params.bId, function (result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success','成功', result))
        res.end()
    })
}
path.set('/queryCountByBlogId',queryCountByBlogId)
path.set('/queryCommentByBlogId',queryCommentByBlogId)
path.set('/queryRandomCode', queryRandomCode)
path.set('/addComment', insertComment)
module.exports.path = path
