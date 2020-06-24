
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

        await review.save()
        const updatedStore = await Review.calcAverageRatings(req.params.id)


        // TODO - ADD TRY CATCH TO THIS
        const user = await User.findById(req.user._id)
        user.reviews.push(review)
        await user.save()


        res.send(updatedStore)
  
    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed your request', 500)
      )
    }
    
    
}

exports.updateReview = async (req, res) => {
 
  
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'rating']
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
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
            }
        )
        if (!review) {
          return next(
            new HttpError('Could not find matched review.', 422)
          )
        }

        const updatedStore = await Review.calcAverageRatings(req.params.id)

        res.send(updatedStore)
        

    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed your request', 500)
      )
    }
 
}

exports.deleteReview = async (req, res) => {

    try {

        const review = await Review.findOneAndDelete({  author: req.user._id, store: req.params.id })

        if (!review) {
            return next (
              new HttpError('Review not found', 404)
            )
        }

        await Review.calcAverageRatings(req.params.id)
        
        res.send(review)

    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed to delete review', 500)
      )
    }
 
}