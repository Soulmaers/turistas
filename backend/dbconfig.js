const sql = require('mssql')
require('dotenv').config();



const config = {
    server: 'localhost', // Или '127.0.0.1', или 'localhost\имя_экземпляра'
    database: 'turistas', // Имя вашей базы данных
    user: 'sa',
    password: 'Alex',
    options: {
        trustServerCertificate: true,
        encrypt: false,
        requestTimeout: 30000
    }
};


const pool = new sql.ConnectionPool(config);
const connection = pool.connect();

module.exports = {
    sql,
    connection
}