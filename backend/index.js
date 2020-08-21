const mongoose = require('mongoose')

// MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dang-thats-delicious-wll2p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})



// Start app
const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

