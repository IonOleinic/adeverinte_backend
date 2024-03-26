const certificateRoutes = require('express').Router()
const certificateController = require('../controllers/certificateController')

certificateRoutes.post('/certificate', certificateController.createCertificate)

certificateRoutes.get(
  '/student-certificates',
  certificateController.getStudentCertificates
)
certificateRoutes.get('/certificates', certificateController.getAllCertificates)

certificateRoutes.get(
  '/certificate/:registrationNr',
  certificateController.getCertificateByRegistrationNr
)

certificateRoutes.put(
  '/certificate/:registrationNr',
  certificateController.updateCertificateByRegistrationNr
)

certificateRoutes.delete(
  '/certificate/:registrationNr',
  certificateController.deleteCertificateByRegistrationNr
)
certificateRoutes.delete(
  '/certificates',
  certificateController.deleteAllCertificates
)

module.exports = certificateRoutes
