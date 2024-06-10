const certificateService = require('../services/certificateService')
const studentService = require('../services/studentService')

const createCertificate = async (req, res) => {
  try {
    // Check if student exists
    const student = await studentService.getStudentByEmail(
      req.body.studentEmail
    )
    if (!student) {
      res.status(404).json({
        message: `Student with email='${req.body.studentEmail}' does not exist in database.`,
      })
      return
    }
    //check if certificate with registration nr already exists
    if (
      req.body.registrationNr &&
      !(await certificateService.getCertificateByRegistrationNr(
        req.body.registrationNr
      ))
    ) {
      res.status(409).json({
        message: `Certificate with registrationNr='${req.body.registrationNr}' already exists`,
      })
      return
    }
    const certificate = await certificateService.createCertificate(req.body)
    res.status(201).json(certificate)
    return certificate.registrationNr
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCertificates = async (req, res) => {
  try {
    let certificates = await certificateService.getCertificatesByDateInterval(
      req.query['start-date'],
      req.query['end-date']
    )

    if (req.query['student-email'])
      certificates = certificates.filter(
        (certificate) => certificate.studentEmail === req.query['student-email']
      )
    res.json(certificates)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCertificateByRegistrationNr = async (req, res) => {
  try {
    const certificate = await certificateService.getCertificateByRegistrationNr(
      req.params.registrationNr
    )
    if (certificate) {
      res.json(certificate)
    } else {
      res.status(404).json({
        msg: `Certificate with registrationNr='${req.params.registrationNr}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCertificateByRegistrationNr = async (req, res) => {
  try {
    const updateResult =
      await certificateService.updateCertificateByRegistrationNr(
        req.params.registrationNr,
        req.body
      )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res.status(404).json({
        msg: `Certificate with registrationNr='${req.params.registrationNr}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCertificateByRegistrationNr = async (req, res) => {
  try {
    const deleteResult =
      await certificateService.deleteCertificateByRegistrationNr(
        req.params.registrationNr
      )
    if (deleteResult) {
      res.status(204).json({
        msg: `Certificate with registrationNr='${req.params.registrationNr}' was deleted`,
      })
    } else {
      res.status(404).json({
        msg: `Certificate with registrationNr='${req.params.registrationNr}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteAllCertificates = async (req, res) => {
  try {
    await certificateService.deleteAllCertificates()
    res.status(204).json({ message: 'All certificates were deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCertificate,
  getCertificates,
  getCertificateByRegistrationNr,
  updateCertificateByRegistrationNr,
  deleteCertificateByRegistrationNr,
  deleteAllCertificates,
}
