const express = require('express')

const router = express.Router()

// Controller
const { 
    addUsers, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user')
const { 
    getProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProduct 
} = require('../controllers/product')
const { 
    getCategories, 
    getCategory, 
    addCategory, 
    deleteCategory, 
    updateCategory 
} = require('../controllers/category')
const { 
    getTransactions, 
    addTransaction 
} = require('../controllers/transaction')
const { register, login, checkAuth } = require('../controllers/auth')


// Middleware
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')


/*====Routes====*/
// user
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)


// products
router.get('/products', getProducts)
router.get('/product/:id', auth, getProduct)
router.post('/product', auth, uploadFile('image'), addProduct) 
router.patch('/product/:id', auth, uploadFile("image"), updateProduct)
router.delete('/product/:id', auth, deleteProduct)
router.delete('/product-admin/:id', auth, deleteProduct)


// categories
router.get('/categories', getCategories)
router.post('/category', auth, addCategory)
router.get('/category/:id', auth, getCategory)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)


// transactions
router.get('/transactions', getTransactions)
router.post('/transaction', auth, addTransaction)


// auth
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

module.exports = router