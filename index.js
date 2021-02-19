const express = require('express')
const menu = require('./routes/menu')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/menu', menu)

module.exports = app