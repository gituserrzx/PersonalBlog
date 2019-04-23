const mysql = require('mysql')

function connect () {
    const connection = mysql.createConnection({
        host: '192.168.2.150',
        port: '3306',
        user: 'root',
        password: 'zx123',
        database: 'my_blog'
    })
    return connection
}
module.exports.connect = connect
