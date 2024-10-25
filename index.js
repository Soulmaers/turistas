const express = require('express')
const path = require('path')
const mssql = require('mssql')
const cors = require('cors')

const port = process.env.PORT
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static(path.join('__dirname', 'app/build')))


app.get('*', (req, res) => {
    res.sendFile(path.join('__dirname', 'app/build', 'index.html'))
})


app.listen(port, () => console.log('Сервер запущен локально на 3333 порту'))