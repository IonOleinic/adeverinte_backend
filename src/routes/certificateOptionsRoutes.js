const certificateOptionsRoutes = require('express').Router()
const certificateOptionsController = require('../controllers/certificateOptionsController')

certificateOptionsRoutes.post(
  '/certificate-options',
  certificateOptionsController.createCertificateOptions
)

certificateOptionsRoutes.get(
  '/all-certificate-options',
  certificateOptionsController.getAllCertificateOptions
)

certificateOptionsRoutes.get(
  '/last-used-mask',
  certificateOptionsController.getLastUsedMask
)

certificateOptionsRoutes.get(
  '/certificate-options',
  certificateOptionsController.getCertificateOptionsByDate
)
certificateOptionsRoutes.get(
  '/certificate-options/:date',
  certificateOptionsController.getCertificateOptionsByDate
)

certificateOptionsRoutes.put(
  '/certificate-options',
  certificateOptionsController.updateCertificateOptionsByDate
)
certificateOptionsRoutes.put(
  '/certificate-options/:date',
  certificateOptionsController.updateCertificateOptionsByDate
)

certificateOptionsRoutes.delete(
  '/certificate-options',
  certificateOptionsController.deleteCertificateOptionsByDate
)
certificateOptionsRoutes.delete(
  '/certificate-options/:date',
  certificateOptionsController.deleteCertificateOptionsByDate
)

module.exports = certificateOptionsRoutes
