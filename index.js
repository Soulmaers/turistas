const express = require('express')
const path = require('path')
const mssql = require('mssql')
const cors = require('cors')
require('dotenv').config()


const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join('__dirname', 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join('__dirname', 'client/build', 'index.html'))
})
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`))