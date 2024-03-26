const certificateRequestRoutes = require('express').Router()
const certificateRequestController = require('../controllers/certificateRequestController')

certificateRequestRoutes.post(
  '/certificate-request',
  certificateRequestController.createCertificateRequest
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

module.exports = certificateRequestRoutes
