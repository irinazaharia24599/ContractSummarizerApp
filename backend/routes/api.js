const express = require('express')
const userController = require('../controllers/usersController')
const contractsController = require('../controllers/contractsController')
const auth = require('../controllers/auth')
const upload = require('../controllers/upload')

const nearley = require("nearley");

const router = express.Router()

router.get('/api/users', userController.listAllUsers) 
router.post('/api/users', userController.registerUser) 
router.post('/api/users/login', userController.loginUser) 
router.post('/api/users/logout', auth, userController.logoutUser) 
router.get('/api/users/me', auth, userController.findUserById) 

router.get('/api/contracts/:id', auth, contractsController.listAllContracts)
router.post('/api/contracts', auth, contractsController.addContract)
router.delete('/api/contracts/:id', contractsController.deleteContract)
router.get('/api/download/:id', contractsController.downloadContract)

router.post('/api/upload/:id', auth, upload.single('contract'), contractsController.uploadContract)

module.exports = router