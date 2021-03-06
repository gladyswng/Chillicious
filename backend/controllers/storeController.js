const fs = require('fs')

const Store = require('../models/Store')
const User = require('../models/User')
const Review = require('../models/Review')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const { body, validationResult } = require('express-validator')
const fileDelete = require('../middleware/file-delete')


exports.getStores = async (req, res, next) => {
    //stores?limit=10&skip=20
    
    const kmToRadian = (km) => {
      const earthRadiusInKm = 6371
      return km / earthRadiusInKm
    }
    let searchCoordinates
    try {
      
      if (req.body.location){
  
        const coordinates = await getCoordsForAddress(req.body.location)
        searchCoordinates= [coordinates.lng, coordinates.lat ]

      } 
    } catch(e) {
      return next(
        new HttpError('Invalid Address', 404)
      )
    }

    try {
      await Store.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              searchCoordinates,
              kmToRadian(200)
            ],
          }
        }
        
      }, function (err, stores) {
     
          res.json({stores, searchCoordinates})
      })
    } catch(e) {
        return next(
          new HttpError('Something went wrong, could not fetch the results.', 500)
        )
       
    }
    
}

// Store page - individual
exports.getStoreBySlug = async (req, res, next) => {
    try {
        const store = await Store.findOne({
            slug: req.params.slug
        }).populate({ path: 'author', select: 'name' }).populate('reviews')
        
        //, null, null, sort({ created: 1 })).exec(function (err) {
        //   console.log(err)
        // })
        
        
        //('reviews', null, null, sort({ created: 1 })).exec()
        //({ path: 'reviews', options: { sort: { created: 1 }}}).exec()
        // .sort({ created: 1 })
        // TODO - EXCLUDE ID
        
        if (!store) {
          return next(
            new HttpError('Something went wrong, could not find store.', 404)
          )
            
        }
        res.send(store)
    } catch (e) {
      console.log(e)
      return next(
        new HttpError('Something went wrong, could not fetch store', 500)
      )
        
    }
}

// KEEP FOR LATER?
exports.getStoresByCheckedList = async (req, res) => {
    const tagList = req.body.tagList || { $exists: true }
    const priceRange = req.body.priceRange || { $exists: true }
    const rating = req.body.rating || { $exists: true }
    // const sortBy = req.query.sortBy || { $exists: true }
    
    try {
        // Filter with multiple tags
        // /tags?tag=asian&tag=spicy
        // ??? TODO - DELETE CHECKEDLIST
        const storeList = await Store.find({ tags: {$all: tagList}, priceRange: {$all: priceRange}, ratingsAverage: { $all: rating } }).sort({ratingsAverage: -1})

        if (!storeList) {
          return next(
            new HttpError('Could not find matched stores', 404)
          )
            // res.status(404).send()
        }
        res.send(storeList)

    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not fetch stores.', 500)
      )
    }
}

exports.heartStore = async (req, res, next) => {

    const hearts = req.user.hearts.map(storeIdObj => storeIdObj.toString())
    try {
      const storeExisted = Store.findById( req.params.id)
      // TODO - FIX ERROR MESSAGE NOT SHOWING 
      if (!storeExisted) {
        return next (
          new HttpError('Could not find store', 404)
        )
      }
      // If already exist, pull - when send same id twice - disapear
      const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet'
      const user = await User.findByIdAndUpdate(req.user._id, {
          [operator]: { hearts: req.params.id }
      }, { new: true })
      if (!user) {
        return next(
          new HttpError('Could not find user', 404)
        )
      }
      res.send(user)
      
    } catch (e) {
      return next(
        new HttpError('Something went wrong. Could not fetch result', 500)
      )
    }

    
}
exports.getHearts = async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
      return next(
        new HttpError('Could not find user', 404)
      )
    }

    const hearts = user.hearts
    res.send(hearts)
}

exports.addStore = (req, res) => {
    res.send('addStoreForm')
}


exports.createStore = async (req, res, next) => {

  if (!req.file) {
    return next(
      new HttpError('Please upload a photo', 404)
    )
  }
  const { name, description, address, image, priceRange, tags } = req.body

 
  let coordinates
  
  try {
    coordinates = await getCoordsForAddress(address)
    
  } catch (e) {
    return next(e)
  }
  
  // Auth
  // send req.body 
  const addedStore = {
    name,
    description,
    location: { 
      type: 'Point',
      coordinates: [
        coordinates.lng, 
        coordinates.lat 
      ]
      },
    address: address,
    //image: '/api/' + req.file. 
    // We can store the full url here but we want to prepend it on the frontend so we only save the file path here on server
    image: req.file.location,
    priceRange,
    tags
   
  }
  const store = new Store({
    // ...req.body,
    ...addedStore,
    author: req.user._id
  })
  // Add Store to user
  
  const user = await User.findById(req.user._id)

  if (!user) {
    return next(
      new HttpError('Could not find user', 404)
    )
  }

    try {
      // TODO - ADD SESSION HERE!!!
      await user.stores.push(store)
      await user.save()
      await store.save()
      res.status(201).send(store)
    } catch(e) {
      return next(e)
      // return next(
      //   new HttpError('Something went wrong, could not proceed to create store', 500)
      // )
    }

}
exports.storeValidationRules = () => {
  return [
      body('name')
      .not().isEmpty().withMessage('You must supply a name'),
      
      body('description')
      .not().isEmpty().withMessage('You must supply a description')
      .isLength({ min: 15, max: 125 }).withMessage('Description must be at 15-125 chars long'),

      body('priceRange')
      .not().isEmpty().withMessage('You must supply price range'),

      body('address')
      .not().isEmpty().withMessage('You must supply an address'),
      
      // .not().matches('password').withMessage('Must not contain the word "password"'),
      body('name')
      .trim(),
      body('description')
      .trim(),
      body('address')
      .trim(),
      body('priceRange')
      .trim()
  ]
  
}

exports.validateRegister = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {

    return next()
  }
  


  
  const extractedErrors = errors.errors[0].msg

  return res.status(422).json({message: extractedErrors})

}

const confirmOwner = (store, user) => {
    // equals() is a method that comes along since the store.author is going to be an ObjectID. In order to compare an ObjectID with an actual string we need to use the .equals() that lives inside of it
    if (!store.author.equals(user._id)) {
        throw new HttpError('You must own the store in order to edit it!', 401)
    }

    return 
}

exports.editStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id, function (err, store) {
      if (!store) {
        return next(
          new HttpError('Could not find store', 404)
        )
      } 
      if (err) {
        return next(
          new HttpError('Something went wrong, could not proceed to edit store', 500)
        )
      }
    })
    

    confirmOwner(store, req.user)
  

    res.send(store)
} catch(e) {
  return next(
    new HttpError('Something went wrong, could not proceed to edit store', 500)
  )
}   

}

exports.updateStore = async (req, res, next) => {
  const updates = Object.keys(req.body)

  const allowedUpdates = ['name', 'description', 'tags', 'priceRange', 'address', 'image']

    //  TODO - GET THE RIGHT ERROR MESSAGE
    try {
      const isValidOperation = updates.every(update => {
          return allowedUpdates.includes(update)
      })
  
      if (!isValidOperation) {
        throw new HttpError('Invalid update!', 422)

      }
      

      const store = await Store.findOne({ _id: req.params.id,  author: req.user._id}, function (err, store) {
        
        if (!store) {
          return next(
            new HttpError('Could not find matched store, you have to be the author to edit store page', 401)
          )
          
        }
        if (err) {
          return next(
            new HttpError('bla', 401)
          )
        }
      })

      //TODO - Message not showing, showing mongodb's message instead

     
      let imageSource
      if (req.file === undefined) {
        imageSource = req.body.image
      } else {
        imageSource = req.file.location
        // TODO - DELETE PHOTO IN BUCKET 
        fileDelete(store.image)
        // fs.unlink(store.image, err => {

        //   console.log(err)
        // })
        
      }
     
      updates.forEach(update => {
          store[update] = req.body[update]
      })
      console.log(store.image)
      // TODO - CHANGE WAY TO SAVE HERE
      store.address = req.body.address.toLowerCase()
      store.image = imageSource
      let coordinates
        try {
          coordinates = await getCoordsForAddress(req.body.address)         
        } catch (e) {
          return next(e)
        }
      store.location = {
        type: 'Point',
        coordinates: [coordinates.lng, coordinates.lat]
        }
      
      await store.save()
      res.send(store)
      // res.redirect(`/stores/${store._id}/edit`)
    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed to update store', 500)
      )
    }
    
}




exports.deleteStore = async (req, res, next) => {

    
    try {
      // TODO - IF DELETED, DELTE USER'S STORE TOO - USE mongoose.startSession()
        // check if existed?
        const storeExisted = await Store.findById(req.params.id)
        if (!storeExisted) {
          return next(
            new HttpError('Could not find matched store.', 404)
          )
        } // error message not showing 

        await Store.findByIdAndDelete(req.params.id)

        // TODO - DELETE PHOTO IN BUCKET 
        fileDelete(storeExisted.image)
        // const imagePath = storeExisted.image
        // fs.unlink(imagePath, err => {
        //   console.log(err)
        // })
        // const userReview = await Review.findOne({ author: req.user._id, store: req.params.id })

        if (storeExisted.reviews.length > 0) {
          await Review.deleteMany({ store: req.params.id })
        }
        

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
          '$pull': { stores: req.params.id }
          // '$pull': { reviews: userReview._id }
        }).populate('reviews').populate('hearts', '-author -created').populate('stores')
        
        res.send(updatedUser)
    } catch(e) {
      return next(
        new HttpError(`Something went wrong, could not proceed to delete store, ${e}`, 500)
      )
    }

}

exports.searchStore = async (req, res, next) => {

  const textQuery = new RegExp(`${req.body.query}`, 'i')
  try {
 
    let storeResult
    if (req.body.query.length > 0 ){
      storeResult = await Store
      .find({ name: textQuery }).limit(4)
    }
  //   .find({
  //     $text: {
  //         $search: req.body.query

  //     }   

  // }, {
  //   score: { $meta: 'textScore' }
  // })
  // // Sort them
  // .sort({
  //   score: { $meta: 'textScore' }
  // })
  // // Limit to only 5 results
  // .limit(5)
    // .aggregate([
    //   {
    //     $search: {
    //       "autocomplete" : {
    //         "path": "name",
    //         "query": req.body.query
    //       }
    //     }
    //   },
    //   {
    //     $limit: 6
    //   },
    //   {
    //     $project: {
    //       "_id": 0,
    //       "name": 1
    //     }
    //   }
    // ]) 
    res.send(storeResult)
   } catch (e) {
    return next(
      new HttpError(`Could not find location`, 500)
    )
  }
}


exports.getTopStores = async (req, res, next) => {
  try {
    const topStores = await Store
    .find()
    .sort({'ratingsAverage': -1})
    .limit(4)

    res.send(topStores)
    
  } catch (e) {
    console.log(e)
  }


}



