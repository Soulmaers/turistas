const express = require('express')
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const routes = require('./routes/routes')



const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(express.static(path.join('__dirname', 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join('__dirname', 'client/build', 'index.html'))
})
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`))