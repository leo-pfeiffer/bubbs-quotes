const express = require('express')
const menu = require('./routes/menu')
const quote = require('./routes/quote')
const daily = require('./routes/daily')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/menu', menu)
app.use('/quote', quote)
app.use('/daily', daily)

module.exports = app