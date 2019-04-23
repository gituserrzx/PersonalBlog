const fs = require('fs')

const globalConfig = {}

const config = fs.readFileSync('./server.conf')
const data = config.toString().split('\r\n')

for (let i = 0; i < data.length; i++) {
    if (data[i]) {
        globalConfig[data[i].split('=')[0].trim()] = data[i].split('=')[1].trim()
    }
}
module.exports = globalConfig
