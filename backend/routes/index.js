const express = require('express')
const router = express.Router()


const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')
const auth = require('../middleware/auth')
// STORE

router.get('/', storeController.getStores) 
router.get('/stores', storeController.getStores) 
router.get('/stores/:slug', storeController.getStoreBySlug)
// Render storeForm
router.get('store/add', auth, storeController.addStore)
// Submit storeForm - when add''
router.post('/store/add', auth, 
storeController.storeValidationRules(),
storeController.validateRegister,
storeController.createStore)
// Render storeForm?
router.get('/store/edit/:id', auth, storeController.editStore)
// Submit storeForm - when add'update/:id'
router.patch('/store/update/:id', auth, 
storeController.storeValidationRules(),
storeController.validateRegister,
storeController.updateStore) 


router.delete('/stores/:id', auth, storeController.deleteStore)
// 
router.get('/tags', storeController.getStoresByTag)
router.get('/tags/:tag', storeController.getStoresByTag)

router.post('/api/stores/:id/heart', auth, storeController.heartStore)
router.get('/user/me/hearts', auth, storeController.getHearts)



// USER
router.get('/register', userController.registerForm)

router.post('/user/register', 
    userController.userValidationRules(),
    userController.validateRegister,
    userController.register,

)

router.get('/login', userController.loginForm)
router.post('/login', userController.login)
router.get('/logout', auth, userController.logout)
router.get('/logoutAll', auth, userController.logoutAll)

router.patch('/user/me', 
  auth, 
  userController.userUpdateValidationRules(),
  userController.validateRegister,
  userController.updateProfile
)

router.delete('/user/me', auth, userController.deleteProfile)
// router.post('/login', authController.login)


// REVIEW
router.post('/stores/:id/addReview', auth, reviewController.addReview)
router.patch('/stores/:id/updateReview', auth, reviewController.updateReview)
// router.patch('/user/me/profile', auth, reviewController.updateReview)
router.delete('/stores/:id/deleteReview', auth, reviewController.deleteReview)

module.exports = router