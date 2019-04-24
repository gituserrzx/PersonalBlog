const tagsDao = require('../dao/tagsDao')
const resqUtil = require('../util/respUtil')

const path = new Map()

function queryRandomTags (req, res) {
    tagsDao.queryAllTag((result) => {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false
        })
        res.writeHead(200)
        res.write(resqUtil.writeResult('success', '成功', result))
        res.end()
    })
}
path.set('/queryRandomTags', queryRandomTags)
module.exports.path = path
