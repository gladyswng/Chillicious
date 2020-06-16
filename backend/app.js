const express = require('express')

const app = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(routes)


app.use(express.json())


app.use((req, res, next) => {
  const error = new HttpError('Could not find this page', 404)
  throw error
})

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
