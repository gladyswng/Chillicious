
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
    
    try {

        const review = await Review.findOneAndUpdate(
            { author: req.user._id, store: req.params.id },
            // ALLOWED UPDATE??
            { 
                text: req.body.text,
                rating: req.body.rating
            }
        )

        const updatedStore = await Review.calcAverageRatings(req.params.id)

        res.send({review, updatedStore})
        

    } catch(e) {
        res.status(400).send(e)
    }
 
}

exports.deleteReview = async (req, res) => {

    try {

        const review = await Review.findOneAndDelete({  author: req.user._id, store: req.params.id })

        if (!review) {
            throw new HttpError('Review not found', 404)
        }

        await Review.calcAverageRatings(req.params.id)
        
        res.send(review)

    } catch(e) {
        res.status(400).send(e)
    }
 
}