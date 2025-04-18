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


/*app.use((req, res, next) => {
    console.log(req.secure)
    // Проверяем, если запрос сделан через HTTPS
    if (req.secure) {
        // Перенаправляем на HTTP
        return res.redirect(`http://${req.headers.host}${req.url}`);
    }
    next(); // Если не через HTTPS, затем продолжаем
});*/


app.use(routes)
app.use(express.static(path.join(__dirname, '../client/build')));
/*app.get('*', (req, res) => {
    res.sendFile(path.join('__dirname', 'client/build', 'index.html'))
})*/

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
    console.log(`Сервер запущен на порту ${port}`),
        updateStatusTournaments()
})