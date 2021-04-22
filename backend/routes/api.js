const express = require('express')
const userController = require('../controllers/usersController')
const auth = require('../controllers/auth')

const router = express.Router()

router.get('/api/users', userController.listAllUsers)
router.post('/api/users', userController.registerUser)
router.post('/api/users/login', userController.loginUser)
router.post('/api/users/logout', auth, userController.logoutUser)
router.get('/api/users/me', auth, userController.findUserById)
router.put('/api/users/me', auth, userController.updateUser)
router.delete('/api/users/me', auth, userController.deleteUser)

module.exports = router