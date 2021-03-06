const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HttpError = require('../models/http-error')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fileUpload = require('../middleware/file-upload')

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
        minlength: 6,
        validate(value) {

            if (value.toLowerCase().includes('password')) {
                throw new HttpError('Must not contain the word "password".', 422)
            }
        }

    },
    avatar: {
      type: String
    },
    hearts: [{
        type: Schema.ObjectId,
        ref: 'Store'
    }],
    reviews: [{
      type: Schema.ObjectId,
      ref: 'Review'
    }],
    stores: [{
      type: Schema.ObjectId,
      ref: 'Store'
    }],
    tokens: [{  // an array of objects
        token: {
            type: String,
            required: true
        }
    }],
    resetPasswordToken: String, 
    resetPasswordExpires: Date,

}, {
    
    // id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

})

userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new HttpError ('Invalid credentials, unable to log in', 422)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new HttpError ('Invalid credentials, unable to log in', 422)
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
    , { expiresIn: '12h'})

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// userSchema.statics.getUser = async (userId) => {
//   try {
//     // TODO - FLTER OUT DEAD REFS
//      const user = await User.findById(userId)
//      .populate('reviews')
//      .populate('stores', '-location -author -created')
//      .populate('hearts', '-location -author -created')
//      .exec(
//        // TODO - FILTER OUT DEAD REFERENCE?
//     //    (err, user) => { 
//     //   // console.log(user.hearts)
//     //   // user.hearts = user.hearts.filter(store => store != null)
      
//     // //   // res.send(user) // Return result as soon as you can
//     // //   // user.save() // Save user without dead refs to database
//     // }
//     )
//     // console.log(user)
//     return user

//   } catch (e) {
//     return next(
//       new HttpError('Something went wrong, could not proceed to get your profile', 500)
//     )
//   }
// }

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})


const User = mongoose.model('User', userSchema)

module.exports = User