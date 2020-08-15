const fs = require('fs')
const path = require('path') // the absolute path
const express = require('express')
const app = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')))
// static() means you don't execute it but just return it
app.use('/api/backend/uploads/images', express.static(path.join('backend','uploads', 'images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next();
});

app.use('/api', routes)


app.use(express.json())


app.use((req, res, next) => {
  console.log(req)
  const error = new HttpError('Could not find this page', 404)
  throw error
})

app.use((error, req, res, next) => {
  if (req.file) {
    // cb func on unlink trigger when deletion is done
    fs.unlink(req.file.path, (err) => {
      console.log(err)
    })
  }
  if (res.headerSent) {
    // if response has  been sent
    return next(error)  
    // send response on its own
  }
  // if not send response
  res.status(typeof error.code === 'number'? error.code : 500)
  res.json({ message: error.message || 'An unknown error occurred' })
})

module.exports = app
