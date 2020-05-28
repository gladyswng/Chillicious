const express = require('express')

const app = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')





app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)
app.use(express.json())




module.exports = app
