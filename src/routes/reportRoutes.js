const reportRoutes = require('express').Router()
const reportController = require('../controllers/reportController')

reportRoutes.get('/certificates-report', reportController.getCertificatesReport)
reportRoutes.get('/requests-report', reportController.getRequestsReport)

module.exports = reportRoutes
