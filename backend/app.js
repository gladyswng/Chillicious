const express = require('express')

const app = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(routes)
app.use(express.json())

app.use((error, req, res, next) => {
  if (res.headerSent) {
    // if response has already been sent
    return next(error)  
    // send response on its own
  }
  // if not send response
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred' })
})

module.exports = app
