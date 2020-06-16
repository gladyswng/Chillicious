const mongoose = require('mongoose')
const slugify = require('slugify')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        required: true
    },
    priceRange: {
      type: String,
      required: true,
    },
    tags: [String],
    
    location: {
      type: {

        lat: { 
          type: Number
    
        },
        lng: {
          type: Number
        }
      }
    },
    address: {
      type: String,
      required: true
    },
    photo: String, 

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    created: {
      type: Date,
      default: Date.now
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


// VIRTUAL STORE ID
storeSchema.virtual('id').get(function(){
  return this._id.toHexString();
});


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