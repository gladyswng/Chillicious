const fs = require('fs')
const User = require('../models/User')
const HttpError = require('../models/http-error')
const { body, validationResult } = require('express-validator')
const fileUpload = require('../middleware/file-upload')
// const { findById } = require('../models/User')



exports.registerForm = (req, res) => {
    
    res.send('registerForm')
}

exports.register = async (req, res, next) => {
    
    try {
      const existed = await User.findOne({ email: req.body.email})
      
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
      
      res.send({ user: user.id, token })
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
        .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
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
       
      return next()
    }
    
    const extractedErrors = errors.errors[0].msg

    return res.status(422).json({ message: extractedErrors })
 
}

exports.userUpdateValidationRules = () => {
  return [
      body('name')
      .not().isEmpty().withMessage('You must supply a name'),     
      // body('password')
      // .not().isEmpty().withMessage('You must create a password')
      // .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
      // .not().matches('password').withMessage('Must not contain the word "password"'),
      body('name')
      .trim()
  ]
  
}


exports.getUser = async (req, res, next) => {

  try {
    // TODO - FLTER OUT DEAD REFS
     await User.findById(req.user._id).populate('reviews')
     .populate('stores', '-location -created')
     .populate('hearts', '-location -author -created').exec((err, user) => { 
        // filter out?
      user.hearts = user.hearts.filter(store => store != null)
      
      res.send(user) // Return result as soon as you can
      user.save() // Save user without dead refs to database
    })

  } catch (e) {
    return next(
      new HttpError('Something went wrong, could not proceed to get your profile', 500)
    )
  }
}

exports.updateProfile = async (req, res, next) => {
  console.log(req.body)
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'image']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
      return next(
        new HttpError('Invalid updates.', 400)
      )
    }
    let imageSource
      if (req.file === undefined) {
        imageSource = req.body.image
      } else if (req.file && req.user.avatar) {
        imageSource = req.file.path
        fs.unlink(req.user.avatar, err => {
        console.log(err)
        })  
      } else {
        imageSource = req.file.path
      }
    try {
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })
        // req.user.name = req.body.name
        req.user.avatar = imageSource

        await req.user.save()

        // const user = await User.findById(req.user._id)
        res.send({ userProfile: req.user, message: 'Profile updated' })

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
        res.send({ message: 'You are logged out!' })
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