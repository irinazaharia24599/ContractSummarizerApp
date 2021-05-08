const express = require('express')
const userController = require('../controllers/usersController')
const contractsController = require('../controllers/contractsController')
const auth = require('../controllers/auth')

const router = express.Router()

router.get('/api/users', userController.listAllUsers) 
router.post('/api/users', userController.registerUser) 
router.post('/api/users/login', userController.loginUser) 
router.post('/api/users/logout', auth, userController.logoutUser) 
router.get('/api/users/me', auth, userController.findUserById) 

router.get('/api/contracts', contractsController.listAllContracts)

module.exports = router