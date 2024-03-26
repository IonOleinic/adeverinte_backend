const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const authRoutes = require('express').Router()

authRoutes.post('/login', authController.handleLogin)
authRoutes.post('/register', userController.createUser)
authRoutes.post('/logout', authController.handleLogout)

module.exports = authRoutes
