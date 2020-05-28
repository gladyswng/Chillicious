const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validator: [validator.isEmail, 'Invalid email address'],
        require: 'Please supply an email address'
    },
    name: {
        type: String,
        trime: true,
        require: 'Please supply a name'
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {

            if (value.toLowerCase().includes('password')) {
                throw new Error('Must not contain the word "password".')
            }
        }

    },
    hearts: [{
        type: Schema.ObjectId,
        ref: 'Store'
    }],
    tokens: [{  // an array of objects
        token: {
            type: String,
            required: true
        }
    }],

    photo: {
        type: Buffer
    }
})




userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error ('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error ('Unable to log in')
    }

    return user

}

userSchema.methods.toJSON = function () {
    const user = this
    // toObject - mongoose, to get us just the raw data - turn mongoose doc to plain obj
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    // delete userObject.avatar

    return userObject
} 

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY
    // , {
    //     expiresIn: 86400
    // }
    )

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User