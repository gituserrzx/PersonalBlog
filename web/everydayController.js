const everyDayDao = require('../dao/everyDayDao')
const timeUtil = require('../util/timeUtil')
const respUtil = require('../util/respUtil')

const path = new Map();

function editEveryDay (req, res) {
    req.on('data', function (data) {
        everyDayDao.editEveryDay(data.toString().trim(),timeUtil.getNew(), function (result) {
            res.writeHead(200)
            res.write(respUtil.writeResult('success', '添加成功', null))
            res.end()
        })
    })
}
path.set('/editEveryDay', editEveryDay)
function queryEveryDay (req, res) {
        everyDayDao.queryEveryDay(function (result) {
            res.writeHead(200)
            res.write(respUtil.writeResult('success', '成功', result))
            res.end()
        })
}

path.set('/queryEveryDay', queryEveryDay)
module.exports.path = path
