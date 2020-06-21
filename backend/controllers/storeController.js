
const Store = require('../models/Store')
const User = require('../models/User')

const HttpError = require('../models/http-error')
const getCoordsForAddress = require('../util/location')
const { body, validationResult } = require('express-validator')

exports.getStores = async (req, res) => {

    //stores?limit=10&skip=20
    try {
        await Store.find({}, function (err, stores) {
       
            res.json(stores)
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

        // TODO - EXCLUDE ID
        
        if (!store) {
          return next(
            new HttpError('Something went wrong, could not find store.', 404)
          )
            
        }
        res.send(store)
    } catch (e) {
      return next(
        new HttpError('Something went wrong, could not fetch store', 500)
      )
        
    }
}

// TODO - connect to react, bring over request
// TODO - SORT RETURNED DOCS ??
exports.getStoresByTag = async (req, res) => {
    const tagQuery = req.query.tag || { $exists: true }
    // const sortBy = req.query.sortBy || { $exists: true }
    
    try {
        // Filter with multiple tags
        // /tags?tag=asian&tag=spicy
        const storeList = await Store.find({ tags: {$all: tagQuery} }).sort({ratingsAverage: -1})

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

exports.heartStore = async (req, res) => {

    const hearts = req.user.hearts.map(storeIdObj => storeIdObj.toString())
    try {
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
    const user = await User.findById(req.user._id).populate('hearts', '-slug -_id -__v')
    if (!user) {
      return next(
        new HttpError('Could not find user', 404)
      )
    }
    res.send({ user })
}

exports.addStore = (req, res) => {
    res.send('addStoreForm')
}


exports.createStore = async (req, res, next) => {
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
    location: coordinates,
    address,
    image,
    priceRange,
    tags
  }

  const store = new Store({
    // ...req.body,
    ...addedStore,
    author: req.user._id
  })

    try {

        await store.save()
        res.status(201).send(store)
    } catch(e) {
      return next(e)
      // return next(
      //   new HttpError('Something went wrong, could not proceed to create store', 500)
      // )
    }
    // res.redirect(`/store/${store.slug}`)

}
exports.storeValidationRules = () => {
  return [
      body('name')
      .not().isEmpty().withMessage('You must supply a name'),
      
      body('description')
      .not().isEmpty().withMessage('You must supply a description')
      .isLength({ min: 15 }).withMessage('Description must be at least 15 chars long'),

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
      console.log(req.body)
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
    
    // if (!store) {
    //   return next(
    //     new HttpError('Could not find store', 404)
    //   )
    // }
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
  const allowedUpdates = ['name', 'description', 'tags', 'priceRange', 'address', 'photo']
  

    try {
      const isValidOperation = updates.every(update => {
          return allowedUpdates.includes(update)
      })
  
      if (!isValidOperation) {
        throw new HttpError('Invalid update!', 422)
          // res.status(400).send({ error: 'Not valid update' })
      }
      

      const store = await Store.findOne({ _id: req.params.id,  author: req.user._id})
      //, author: req.user_id

      if (!store) {
        return next(
          new HttpError('Could not find matched store, you have to be the author to edit store page', 404)
        ) //Message not showing, showing mongodb's message instead
      } 
      updates.forEach(update => {
          store[update] = req.body[update]
      })
      let coordinates
        try {
          coordinates = await getCoordsForAddress(req.body.address)         
        } catch (e) {
          return next(e)
        }
      store.location = coordinates

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
      // const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

      // if (!task) {
      //     res.status(404).send()
      // }
        const store = await Store.findByIdAndDelete(req.params.id)

        if (!store) {
          return next(
            new HttpError('Could not find matched store.', 404)
          )// error message not showing 
          // res.status(404).send()
        } 

        res.send({ message: 'Deleted store.' })
    } catch(e) {
      return next(
        new HttpError('Something went wrong, could not proceed to delete store', 500)
      )
    }

}



