const certificateRequestRoutes = require('express').Router()
const certificateRequestController = require('../controllers/certificateRequestController')

certificateRequestRoutes.post(
  '/certificate-request',
  certificateRequestController.createCertificateRequest
)
certificateRequestRoutes.post(
  '/load-certificate-requests-from-spreadsheet',
  certificateRequestController.loadCertificateRequestsFromSpreadSheet
)

certificateRequestRoutes.get(
  '/all-certificate-requests',
  certificateRequestController.getAllCertificateRequests
)

certificateRequestRoutes.get(
  '/certificate-request/:id',
  certificateRequestController.getCertificateRequestById
)

certificateRequestRoutes.get(
  '/student-certificate-requests',
  certificateRequestController.getCertificateRequestsByStudentEmail
)

certificateRequestRoutes.put(
  '/certificate-request/:id',
  certificateRequestController.updateCertificateRequestById
)

certificateRequestRoutes.delete(
  '/certificate-request/:id',
  certificateRequestController.deleteCertificateRequestById
)

//spreadsheet routes
certificateRequestRoutes.get(
  '/spreadsheet',
  certificateRequestController.getSpreadsheet
)

certificateRequestRoutes.put(
  '/spreadsheet',
  certificateRequestController.updateSpreadsheet
)

module.exports = certificateRequestRoutes
