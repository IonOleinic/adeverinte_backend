const certificateRoutes = require('express').Router()
const certificateController = require('../controllers/certificateController')

certificateRoutes.post('/certificate', certificateController.createCertificate)

certificateRoutes.get('/certificates', certificateController.getCertificates)

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
