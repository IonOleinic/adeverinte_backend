const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.get('/users', userController.getAllUsers)

userRoutes.get('/user/:id', userController.getUserById)

userRoutes.get('/user', userController.getUserByEmail)

userRoutes.post('/user', userController.createUser)

userRoutes.put('/user/:id', userController.updateUserById)
userRoutes.put('/user', userController.updateUserByEmail)

userRoutes.delete('/user/:id', userController.deleteUserById)
userRoutes.delete('/user', userController.deleteUserByEmail)

module.exports = userRoutes
