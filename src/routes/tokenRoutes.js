const tokenController = require('../controllers/tokenController')
const tokenRoutes = require('express').Router()

tokenRoutes.get('/refresh-token', tokenController.handleRefreshToken)

module.exports = tokenRoutes
