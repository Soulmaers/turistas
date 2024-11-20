const sql = require('mssql')
require('dotenv').config();



const config = {
    database: process.env.DATABASE,
    server: process.env.DB_HOST
}


//const pool = new sql.ConnectionPool(config);
//const connection = pool.connect();
//console.log(connection)

module.exports = {
    //  sql,
    //  connection
}