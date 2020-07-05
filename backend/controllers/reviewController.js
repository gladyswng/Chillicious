
const Review = require('../models/Review')
const User = require('../models/User')
const HttpError = require('../models/http-error')

exports.addReview = async (req, res, next) => {
    req.body.author = req.user._id
    req.body.store = req.params.id
    const review = new Review(req.body)
  
    try {
      reviewExisted = await Review.findOne({ author: req.user._id, store: req.params.id })
  
      if (reviewExisted) {
        return next(
          new HttpError('Cannot send more than one review to the same store', 500)
        )
      }
      // TODO - ADD SESSION TO ALL ADD AND DELETE
        // const sess = await mongoose.startSession()
        // sess.startTransaction()
        await review.save()
   
        const updatedStore = await Review.calcAverageRatings(req.params.id)

        // TODO - ADD TRY CATCH TO THIS
        const user = await User.findById(req.user._id)
        user.reviews.push(review)
        await user.save()
        // await sess.commitTransaction()


        res.send(updatedStore)
  
    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed your request', 500)
      )
    }
    
    
}

exports.updateReview = async (req, res, next) => {
 
  
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'rating']
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })


    if (!isValidOperation || req.body.rating > 5) {
      throw new HttpError('Invalid update!', 422)
        // res.status(400).send({ error: 'Not valid update' })
    }
    try {

        const review = await Review.findOneAndUpdate(
            { author: req.user._id, store: req.params.id },
            // ALLOWED UPDATE??
            { 
                title: req.body.title,
                description: req.body.description,
                rating: req.body.rating
            }, {
              new: true
            }
        ).populate('author', 'name avatar').populate('store', 'name')

        console.log(review)
        if (!review) {
          return next(
            new HttpError('Could not find matched review.', 422)
          )
        }

        const updatedStore = await Review.calcAverageRatings(req.params.id)
        console.log(updatedStore)
        res.send({ updatedStore, review })
        

    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed your request', 500)
      )
    }
 
}

exports.deleteReview = async (req, res, next) => {

    try {

        const review = await Review.findOneAndDelete({  author: req.user._id, store: req.params.id })

        if (!review) {
            return next (
              new HttpError('Review not found', 404)
            )
        }

        const updatedStore = await Review.calcAverageRatings(req.params.id)
        // TODO - REMOVE REVIEW ALSO FOR USER
        const user = await User.findByIdAndUpdate(req.user._id, {
          '$pull': { reviews: review._id }
        })
      
        console.log({updatedStore, user})
        
        res.send({ updatedStore, review })

    } catch(e) {
 
      return next(
        new HttpError(`Something went wrong, could not proceed to delete review, ${e.message}`, 500)
      )
    }
 
}