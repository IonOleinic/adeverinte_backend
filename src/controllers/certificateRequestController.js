const certificateRequestService = require('../services/certificateRequestService')

const createCertificateRequest = async (req, res) => {
  try {
    await certificateRequestService.createCertificateRequest(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllCertificateRequests = async (req, res) => {
  try {
    const certificateRequests =
      await certificateRequestService.getAllCertificateRequests()
    res.json(certificateRequests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCertificateRequestsByStudentEmail = async (req, res) => {
  try {
    const certificateRequests =
      await certificateRequestService.getCertificateRequestsByStudentEmail(
        req.query.studentEmail
      )
    res.json(certificateRequests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCertificateRequestById = async (req, res) => {
  try {
    const certificateRequest =
      await certificateRequestService.getCertificateRequestById(req.params.id)
    if (certificateRequest) {
      res.json(certificateRequest)
    } else {
      res.status(404).json({
        message: `Certificate request with id='${req.params.id}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCertificateRequestById = async (req, res) => {
  try {
    const updateResult =
      await certificateRequestService.updateCertificateRequestById(
        req.params.id,
        req.body
      )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res.status(404).json({
        message: `Certificate request with id='${req.params.id}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCertificateRequestById = async (req, res) => {
  try {
    const deleteResult =
      await certificateRequestService.deleteCertificateRequestById(
        req.params.id
      )
    if (deleteResult) {
      res.status(204).json({
        message: `Certificate request with id='${req.params.id}' deleted successfully`,
      })
    } else {
      res.status(404).json({
        message: `Certificate request with id='${req.params.id}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCertificateRequest,
  getAllCertificateRequests,
  getCertificateRequestById,
  getCertificateRequestsByStudentEmail,
  updateCertificateRequestById,
  deleteCertificateRequestById,
}
