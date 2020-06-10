
const Store = require('../models/Store')
const User = require('../models/User')
const HttpError = require('../models/http-error')

exports.getStores = async (req, res) => {

    //stores?limit=10&skip=20
    try {
        await Store.find({}, function (err, stores) {
            res.send(stores)
        })

    } catch(e) {
        res.status(400).send(e)
    }
    
}

// Store page - individual
exports.getStoreBySlug = async (req, res) => {
  
    try {
        const store = await Store.findOne( {
            slug: req.params.slug
        }).populate('author', '-_id -__v')
        

        res.send(store)
    } catch (e) {
        res.status(400).send(e)
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
            new HttpError('Could not fetch the result.', 404)
          )
            // res.status(404).send()
        }
        res.send(storeList)

    } catch(e) {
        res.status(500).send(e)
    }
}

exports.heartStore = async (req, res) => {

    const hearts = req.user.hearts.map(storeIdObj => storeIdObj.toString())

    // If already exist, pull - when send same id twice - disapear
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet'
    const user = await User.findByIdAndUpdate(req.user._id, {
        [operator]: { hearts: req.params.id }
    }, { new: true })

    res.send(user)
}
exports.getHearts = async (req, res) => {
    const user = await User.findById(req.user._id).populate('hearts', '-slug -_id -__v')
    res.send(user)
}

exports.addStore = (req, res) => {
    const { name, description, coordinates, address, author } = req.body
    const addedStore = {
      name,
      description,
      location: coordinates,
      address,
      author
    }
    // push store to database HERE!
    new Store(addedStore) //? right?
    .save
    res.status(201).json({store: addedStore})
}


exports.createStore = async (req, res) => {

    // Auth
    // send req.body 
    const store = new Store({
        ...req.body,
        author: req.user._id
        
    })
    try {

        await store.save()
        res.status(201).send(store)
    } catch(e) {
        res.status(500).send(e)
    }
    // res.redirect(`/store/${store.slug}`)

}

const confirmOwner = (store, user) => {

    // equals() is a method that comes along since the store.author is going to be an ObjectID. In order to compare an ObjectID with an actual string we need to use the .equals() that lives inside of it
    if (!store.author.equals(user._id)) {
        throw new HttpError('You must own the store in order to edit it!', 401)
    }
    res.send(user)
}

exports.editStore = async (req, res) => {
    try {
        // Auth
        const store = await Store.findOne({ _id: req.params.id })
        // TODO - edit store page
        // render store info in page
        confirmOwner(store, req.user)
        res.send(store)
    } catch(e) {
        res.status(400).send(e)
    }
    

}

exports.updateStore = async (req, res, next) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'tags', 'priceRange', 'location', 'address', 'photo']
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
      throw new HttpError('You must own the store in order to edit it!', 422)
        // res.status(400).send({ error: 'Not valid update' })
    }

    try {

        const store = await Store.findOne({ _id: req.params.id })
        //, owner: req.user_id?

        if (!store) {
          return next(
            new HttpError('Could not find matched store.', 404)
          )
          // res.status(404).send()
        } 
        updates.forEach(update => {
            store[update] = req.body[update]
        })
        await store.save()
        res.send(store)
        // res.redirect(`/stores/${store._id}/edit`)
    } catch(e) {
        res.status(400).send(e)
    }
    
}




exports.deleteStore = async (req, res) => {

    try {
        const store = await Store.findByIdAndDelete(req.params.id)

        if (!store) {
          return next(
            new HttpError('Could not find matched store.', 404)
          )
          // res.status(404).send()
        } 
        
        res.send(store)
    } catch(e) {
        res.status(500).send(e)
    }

}



