/* 설정 등록 */
const mysql = require('mysql');

const db = mysql.createConnection({
    host : process.env.DB_HOST
    , user : process.env.DB_USER
    , password : process.env.DB_PWD
    , database : process.env.DB_DATABASE
});

//연결
db.connect();

module.exports = db;
