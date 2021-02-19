const express = require('express')
const menu = require('./routes/menu')
const quote = require('./routes/quote')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/menu', menu)
app.use('/quote', quote)

module.exports = app