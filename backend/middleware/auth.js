const jwt = require('jsonwebtoken')
const User = require('../models/User')
const HttpError = require('../models/http-error')

const auth = async (req, res, next) => {

  // This will not allow to post request to continue as options request
  if (req.method === 'OPTIONS') {
    return next()

  }

    try {

        const token = req.headers.authorization.replace('Bearer ', '')
        // const token = req.headers.authorization.split(' ')[1]

        if (!token) {
          throw new Error('Authentication failed!')
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            return next(
              new HttpError ('Authentication failed!', 401)
            )
        }
        
        req.token = token
        req.user = user
        next()
        
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate' })
    }


}

module.exports = auth