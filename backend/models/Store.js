const mongoose = require('mongoose')
const slugify = require('slugify')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please supply a store name'
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        required: 'Please supply a description'
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
           type: String,
           default: 'Point'
        },
        coordinates: {
            type: [Number],
            // required: 'You must supply coordinates'
        },
        address: {
            type: String,
            // required: 'You must supply an address'
        }
    },
    photo: String, 

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'You must supply an author',
        ref: 'User' 
    },

    ratingsQuantity: {
        type: Number
    },
    ratingsAverage: {
        type: Number
    },
    
    
   
}, 
{   
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



// SAVE SLUG IN STORE
storeSchema.pre('save', async function(next) {

    // if name not modified go on
    if (!this.isModified('name')) {
        next()
        return 
    }  

    this.slug = slugify(this.name)

    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx} ) // Since Store is not created yet here we need to use constructor
    if (storesWithSlug) {
        this.slug = `${this.slug}-${storesWithSlug.length + 1}`
    }
    next()

})

// VIRTUAL REVIEWS

storeSchema.virtual('reviews', {
    ref: 'Review', // what modal to link
    foreignField: 'store',  // Which field on review
    localField: '_id' // which field on Store to match
})

function autopopulate (next) {
    this.populate('reviews')
    next()
}

storeSchema.pre('find', autopopulate)

storeSchema.pre('findOne', autopopulate)


module.exports = mongoose.model('Store', storeSchema)