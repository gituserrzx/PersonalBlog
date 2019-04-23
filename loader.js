const fs = require('fs')
const globalConfig = require('./config')

const controllerSet = []
const pathMap = new Map()

const files = fs.readdirSync(globalConfig.web_path)


for(let i = 0; i < files.length;i ++) {
    const temp = require(`./${globalConfig.web_path}/${files[i]}`)
    if (temp.path) {
        for (let [key,val] of temp.path) {
            if (!pathMap.get(key)) {
                pathMap.set(key, val)
            } else {
                console.log(key+'重复')
            }
        }
    }
    controllerSet.push(temp)
}

module.exports = pathMap
