const sql = require('mssql')
require('dotenv').config();



const config = {
    database: process.env.DATABASE
}


const pool = new sql.ConnectionPool(config);
const connection = pool.connect();
console.log(connection)

module.exports = {
    sql,
    connection
}