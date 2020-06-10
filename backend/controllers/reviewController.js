
const Review = require('../models/Review')
const HttpError = require('../models/http-error')

exports.addReview = async (req, res) => {
    req.body.author = req.user._id
    req.body.store = req.params.id
    const review = new Review(req.body)
    try {
        
        await review.save()
        const updatedStore = await Review.calcAverageRatings(req.params.id)

        res.send(updatedStore)
        // res.redirect('back')
    } catch(e) {
        res.status(400).send(e)
    }
    
    
}

exports.updateReview = async (req, res) => {
    console.log(req.user._id)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['text', 'description', 'rating']
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
                text: req.body.text,
                rating: req.body.rating
            }
        )
        if (!review) {
          return next(
            new HttpError('Could not find matched review.', 422)
          )
        }

        const updatedStore = await Review.calcAverageRatings(req.params.id)

        res.send({review, updatedStore})
        

    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed to update review', 500)
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