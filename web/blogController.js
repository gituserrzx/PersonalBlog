const blogDao = require('../dao/blogDao')
const url = require('url')
const tagDao = require('../dao/tagsDao')
const tagBlogMapping = require('../dao/tagBlogMappingDao')
const timeUtil = require('../util/timeUtil')
const respUtil = require('../util/respUtil')

const path = new Map()
function queryBlogCountByTag(req, res) {
    const params = url.parse(req.url, true).query
    tagBlogMapping.queryBlogCountByTag(parseInt(params.tag), function (result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success', '成功', result))
        res.end()
    })
}
function queryBlogByTag(req, res) {
    const params = url.parse(req.url, true).query
    tagBlogMapping.queryBlogIdByTag(parseInt(params.tag),parseInt(params.page),parseInt(params.pageSize), function (result) {
        if (result && result.length !== 0) {
            const lastResult = []
            for (let i = 0;i < result.length;i++) {
                blogDao.queryBlogById(result[i].blog_id, function(result) {
                    lastResult.push(result[0])
                })
            }
            getResult(result, lastResult, res)

        } else {
            res.writeHead(200)
            res.write(respUtil.writeResult('success', '成功', result))
            res.end()
        }
    })
}
function getResult (result, lastResult, response) {
    if (result.length !== lastResult.length) {
        setTimeout(() => {
          getResult(result, lastResult, response)
        }, 0)
    } else {
        response.writeHead(200)
        response.write(respUtil.writeResult('success', '成功', lastResult))
        response.end()
    }
}
function queryAllBlog(req, res) {
    blogDao.queryAllBlog(function (result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success', '成功', result))
        res.end()
    })
}
function queryHotBlog (req, res) {
    blogDao.queryHotBlog(5,function (result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success', '成功', result))
        res.end()
    })
}
function queryBlogCount (req, res) {
    blogDao.queryBlogCount(function (result) {
        res.writeHead(200)
        res.write(respUtil.writeResult('success', '成功', result))
        res.end()
    })
}
function queryBlogByPage (req, res) {
    const params = url.parse(req.url, true).query
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, '')
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '')
            result[i].content = result[i].content.substring(0, 300)
        }
        res.writeHead(200)
        res.write(respUtil.writeResult('success', '成功', result))
        res.end()
    })
}

function queryBlogById (req, res) {
    const params = url.parse(req.url, true).query
    blogDao.queryBlogById(parseInt(params.bId), function (result){
        res.writeHead(200)
        res.write(respUtil.writeResult('success','查询成功', result))
        res.end()
    })
    blogDao.addViews(parseInt(params.bId), function (result) {})
}

function editBlog (req, res) {
    const params = url.parse(req.url, true).query
    const tag = params.tag.replace(/\s/g, '').replace(/，/g,',')
    req.on('data', function (data) {
        blogDao.insertBlog(params.title, data.toString(), 0, tag, timeUtil.getNew(), timeUtil.getNew(), function (result) {
            res.writeHead(200)
            res.write(respUtil.writeResult('success', '添加成功', null))
            res.end()
            const blogId = result.insertId
            const tagList = tag.split(',')
            for (let i = 0; i < tagList.length;i ++) {
                if (tagList[i] === '') {
                    continue
                }
                queryTag(tagList[i], blogId)
            }
        })
    })
}

function queryTag (tag, blogId) {
    tagDao.queryTag(tag, function (result) {
        if(result == null || result.length === 0) {
            insertTag(tag, blogId)
        } else {
            insertTagBlogMapping(result[0].id, blogId)
        }
    })
}
function insertTag (tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNew(), timeUtil.getNew(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}
function insertTagBlogMapping (tagId, blogId) {
    tagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNew(),timeUtil.getNew(),function (result) {

    })
}
path.set('/queryAllBlog', queryAllBlog)
path.set('/queryHotBlog', queryHotBlog)
path.set('/queryAllBlog', queryAllBlog)
path.set('/queryBlogById', queryBlogById)
path.set('/editBlog', editBlog)
path.set('/queryBlogByPage', queryBlogByPage)
path.set('/queryBlogCount', queryBlogCount)
path.set('/queryBlogByTag',queryBlogByTag)
path.set('/queryCountByTag', queryBlogCountByTag)
module.exports.path = path
