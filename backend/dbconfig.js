const sql = require('mssql')
require('dotenv').config();


console.log(process.env.DATABASE)
const config = {
    server: 'localhost', // Или '127.0.0.1', или 'localhost\имя_экземпляра'
    database: 'turistas', // Имя вашей базы данных
    options: {
        trustedConnection: true, // Используйте Windows Authentication
        encrypt: false // Установите в true, если требуется шифрование
    }
};

sql.connect(config)
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
    });
//const pool = new sql.ConnectionPool(config);
//const connection = pool.connect();
//console.log(connection)

module.exports = {
    sql,
    //  connection
}