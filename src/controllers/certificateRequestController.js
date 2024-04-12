const certificateRequestService = require('../services/certificateRequestService')
const spreadsheetService = require('../services/spreadsheetService')

const createCertificateRequest = async (req, res) => {
  try {
    await certificateRequestService.createCertificateRequest(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const loadCertificateRequestsFromSpreadSheet = async (req, res) => {
  try {
    const unprocessedRequests =
      await spreadsheetService.getUnprocessedCertificateRequests()

    await unprocessedRequests.forEach(async (request) => {
      try {
        await certificateRequestService.createCertificateRequest(request)
      } catch (error) {
        //posible error: duplicate certificate request
      }
    })
    const allCertificateRequests =
      await certificateRequestService.getAllCertificateRequests()
    const unhandledRequests = allCertificateRequests.filter(
      (request) => request.handledBy === null || request.accepted === null
    )
    res.json(unhandledRequests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUnprocessedCertificateRequests = async (req, res) => {
  try {
    const certificateRequests =
      await certificateRequestService.getAllCertificateRequests()
    const filteredRequests = certificateRequests.filter(
      (request) => request.handledBy === null || request.accepted === null
    )
    res.json(filteredRequests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getProcessedCertificateRequests = async (req, res) => {
  try {
    const certificateRequests =
      await certificateRequestService.getAllCertificateRequests()
    const filteredRequests = certificateRequests.filter(
      (request) => request.handledBy != null || request.accepted != null
    )
    res.json(filteredRequests)
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
      res.sendStatus(204)
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
      res.sendStatus(204)
    } else {
      res.status(404).json({
        message: `Certificate request with id='${req.params.id}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSpreadsheet = async (req, res) => {
  try {
    const spreadsheet = await spreadsheetService.getSpreadsheet()
    res.json(spreadsheet)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateSpreadsheet = async (req, res) => {
  try {
    await spreadsheetService.updateSpreadsheet(req.body)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCertificateRequest,
  loadCertificateRequestsFromSpreadSheet,
  getAllCertificateRequests,
  getCertificateRequestById,
  getCertificateRequestsByStudentEmail,
  updateCertificateRequestById,
  getUnprocessedCertificateRequests,
  getProcessedCertificateRequests,
  deleteCertificateRequestById,
  getSpreadsheet,
  updateSpreadsheet,
}
