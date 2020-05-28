const User = require('../models/User')
const { body, validationResult } = require('express-validator')




exports.registerForm = (req, res) => {
    
    res.send('registerForm')
}

exports.register = async (req, res) => {
    
    const user = new User(req.body)
    
    
    try {
        
        await User.init()
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e)
    }

}



exports.loginForm = (req, res) => {
    res.send('loginForm')
}

exports.login = async (req, res) => {

    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token})
        // we don't need to send every information in user like tokens and password
    } catch (e) {
        res.status(400).send()
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
        .isLength({ min: 4 }).withMessage('must be at least 4 chars long')
        .not().matches('password').withMessage('Must not contain the word "password"'),
        
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
    
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors
    })
    
}

exports.updateProfile = async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })

        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
}

exports.logout = async (req, res) => {
    try {
        // user info already fetched from auth

        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token )
        await req.user.save()
        res.send('ok')
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        // Remember we attached user on auth 
        // const user = await User.findByIdAndDelete(req.user._id)

        await req.user.remove()
    } catch (e) {
        res.status(500).send()
    }
}   