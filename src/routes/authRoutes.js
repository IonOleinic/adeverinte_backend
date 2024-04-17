const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const authRoutes = require('express').Router()

authRoutes.post('/register', userController.createUser)
authRoutes.post('/login', authController.handleLogin)
authRoutes.post('/logout', authController.handleLogout)
authRoutes.get('/roles', authController.getAllRoles)

module.exports = authRoutes
