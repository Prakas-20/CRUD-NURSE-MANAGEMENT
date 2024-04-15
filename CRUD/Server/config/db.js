const mysql = require('mysql2/promise')

const mySqlpool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Prakash@2030',
    database:'nurse_db'
})

module.exports = mySqlpool