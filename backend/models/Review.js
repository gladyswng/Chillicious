const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Store = require('./Store')
const User = require('./User')

const reviewSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    rating: {
        type: Number,
        min: 1,
        max:5,
        required: true
    }
    

}, 
{   
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


reviewSchema.index({ store: 1, author: 1 }, { unique: true })




// GET AVERAGE RATINGS

// https://medium.com/@SigniorGratiano/modelling-data-and-advanced-mongoose-175cdbc68bb1

reviewSchema.statics.calcAverageRatings =  async function(storeId) {
    let idToSearch = mongoose.Types.ObjectId(storeId)

    const stats = await this.aggregate([
        {
            $match: { store: idToSearch }
        },
        {
            $group: {
                _id: '$store',
                ratings: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }

    ])
    let updatedStore
    if (stats[0]) {

      updatedStore = await Store.findByIdAndUpdate(storeId, {
          ratingsQuantity: stats[0].ratings,
          ratingsAverage: stats[0].avgRating
      }, { new: true }).populate('reviews')
    } else {
      // TODO - FIX LATER WITH 0 REVIEW WHEN DELETED LAST REVIEW
      updatedStore = await Store.findByIdAndUpdate(storeId, {
        ratingsQuantity: 0,
        ratingsAverage: 0
      }, { new: true }).populate('reviews')
    }

   
    return updatedStore


}

function autopopulate (next) {
  this.populate('author', 'name avatar').populate('store', 'name')
  next()
}

reviewSchema.pre('find', autopopulate)


module.exports = mongoose.model('Review', reviewSchema)









// // Our middleware is declared above our Review declaration, so it doesn’t have access to the review model. However, if we moved the middleware below Review, Review wouldn’t have access to the middleware. The solution is to use this.constructor, which will point to the model that created the document:

// reviewSchema.post('save', function(next) {
//     // this points to current review
//     // using post save since we need the last saved document
  
//     this.constructor.calcAverageRatings(this.store)
// });


// // We also want to update these values when someone edits or deletes a rating. Unfortunately for us, neither findByIdAndUpdate nor findByIdAndDelete have access to document middleware. They only get access to query middleware. Since findByIdAndUpdate(id, ...) is just shorthand for findOneAndUpdate({ _id: id }, ...) (with findByIdAndDelete being a similar shorthand), we’ll create a hook that uses a regular expression:


// reviewSchema.pre(/^findOneAnd/, async function(next) {
//     // to access the review
//     // this. will point to the current query, not the current review
//     const r = await this.findOne();
//     console.log(r);
//     next()
    
// })
// // If we want to run our calculations with the most current data, we’ll need a post() middleware, not pre(). But if use post(), we won’t have access to our query, since it will already have executed. The solution is to turn our r variable into a property, which we can then access in a post() middleware:

// reviewSchema.post(/^findOneAnd/, async function(next) {
//     const res = await this.r.constructor.calcAverageRatings(this.r.store)
//     console.log(res)
//     next()
// })
// // Consider this: r points a review. We’ll need access to the review model to get calcAverageRatings, so we write this.r.constructor.calcAverageRatings(). Then, we pass in the store ID located on that review. And we’re done! Our ratings information will now automatically update upon review creation, edit, and deletion

  