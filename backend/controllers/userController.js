const User = require('../models/User')
const HttpError = require('../models/http-error')
const { body, validationResult } = require('express-validator')




exports.registerForm = (req, res) => {
    
    res.send('registerForm')
}

exports.register = async (req, res, next) => {
    
    
    try {
      const existed = User.find({ email: req.body.email })
      if (existed) {
        return next(
          new HttpError('User already exists.', 404)
        )
      }
      const user = new User(req.body)
        
        await User.init()
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})

    } catch (e) {
      return next(e)
    }

}



exports.loginForm = (req, res) => {
    res.send('loginForm')
}

exports.login = async (req, res, next) => {

    try {

      const user = await User.findByCredentials(req.body.email, req.body.password)
     
      const token = await user.generateAuthToken()
      
      res.send({ message: 'Logged in!', token })
    } catch (e) {
      return next(e)
    }
    
}

exports.userValidationRules = () => {
    return [
        body('name')
        .not().isEmpty().withMessage('You must supply a name'),
        
        body('email')
        .not().isEmpty().withMessage('You must supply an email'),
        
        body('password')
        .not().isEmpty().withMessage('You must create a password')
        .isLength({ min: 4 }).withMessage('Password must be at least 6 chars long'),
        // .not().matches('password').withMessage('Must not contain the word "password"'),
        body('name')
        .trim(),
    
        body('email')
        .isEmail()
        .normalizeEmail()
    ]
    
}

exports.validateRegister = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        console.log(req.body)
      return next()
    }
    
    const extractedErrors =  errors.array().map(err => { 
      return {
        message: err.msg
      }
    })
  
  
    // const extractedErrors = []
    // errors.array().map(err => extractedErrors.push({ message: err.msg }))

    // return res.status(422).json(exetractedErrors)
  
    return res.status(422).json(extractedErrors)
 
}

exports.userUpdateValidationRules = () => {
  return [
      body('name')
      .not().isEmpty().withMessage('You must supply a name'),
      
      body('password')
      .not().isEmpty().withMessage('You must create a password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
      // .not().matches('password').withMessage('Must not contain the word "password"'),
      body('name')
      .trim()
  ]
  
}

exports.updateProfile = async (req, res, next) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return next(
        new HttpError('Invalid updates.', 400)
      )
    }

    try {
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })

        await req.user.save()
        res.send(req.user)

    } catch (e) {
      return next(
        new HttpError('Something went wrong, could not proceed to update profile', 500)
      )
    }
}

exports.logout = async (req, res) => {
    try {
        // user info already fetched from auth

        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token )
        await req.user.save()
        res.send('ok')
    } catch (e) {
      return next(
        new HttpError('Something went wrong, could not proceed your request', 500)
      )
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
      return next(
        new HttpError('Something went wrong, could not proceed to log out', 500)
      )
    }
}

exports.deleteProfile = async (req, res, next) => {
    try {
        // Remember we attached user on auth 
        // const user = await User.findByIdAndDelete(req.user._id)

        await req.user.remove()
    } catch (e) {
      return next(
        new HttpError('Something went wrong, could not proceed to delete profile.', 500)
      )
    }
}   