const express = require('express')
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const webPush = require('web-push');
const { updateStatusTournaments } = require('./servises/servisFunction')





const port = process.env.PORT
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())




app.use(routes)
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
    const filePath = path.join(__dirname, '..', 'client', 'build', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(err.status).end();
        }
    });
});
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);

    // Выполняем первый запрос сразу при запуске приложения
    updateStatusTournaments();

    // Устанавливаем интервал для выполнения функции каждый час
    setInterval(updateStatusTournaments, 1000); // 1 час в миллисекундах
});