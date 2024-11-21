const sql = require('mssql')
require('dotenv').config();


console.log(process.env.DATABASE)
const config = {
    server: 'DESKTOP-7M690IC\\MSSQLSERVER1', // Обратите внимание на двойной обратный слеш!
    database: 'turistas',
    port: 1433,
    options: {
        trustedConnection: true,
        encrypt: true
    }
};

/*sql.connect(config)
    .then(() => {
        console.log('Подключение успешно!');
        sql.close();
    })
    .catch(err => {
        console.error('Ошибка подключения:', err);
        console.error('Полный стек ошибки:', err.stack); // <--- обязательно нужен для диагностики
        console.error('Код ошибки:', err.number); //  если есть
        console.error('Состояние:', err.state); // если есть
        console.error('Сервер:', err.server); // если есть
        console.error('Процедура:', err.proc); // если есть
        console.error('Строка:', err.lineNumber); // если есть
        console.error('Конфигурация подключения:', config);
        console.log('Переменная окружения DATABASE:', process.env.DATABASE);
    });*/
//const pool = new sql.ConnectionPool(config);
//const connection = pool.connect();
//console.log(connection)

module.exports = {
    sql,
    //  connection
}