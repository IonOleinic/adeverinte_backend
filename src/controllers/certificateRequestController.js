const certificateRequestService = require('../services/certificateRequestService')
const spreadsheetService = require('../services/spreadsheetService')
const emailService = require('../services/emailService')

const createCertificateRequest = async (req, res) => {
  try {
    await certificateRequestService.createCertificateRequest(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const acceptCertificateRequest = async (req, res) => {
  try {
    req.body.accepted = true
    const updateResult =
      await certificateRequestService.updateCertificateRequestById(
        req.params.id,
        req.body
      )
    if (updateResult && updateResult != 0) {
      if (req.body.registrationNr)
        await emailService.sendEmail(
          req.body.studentEmail,
          'Cerere adeverinta FIESC',
          'Cerere adeverinta FIESC',
          `<p>Buna ziua, solicitarea dumneavoastra cu privire la obtinerea unei adeverinte de student, in cadrul facultatii FIESC, a fost acceptata.</p> <p>Numarul de inregistrare al adeverintei este: ${req.body.registrationNr}.</p> <p>Va rugam sa va apropiati la secretariat incepand cu urmatoarea zi lucratoare pentru a ridica adeverinta.</p> <br/> <p>O zi buna!</p>`
        )
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

const rejectCertificateRequest = async (req, res) => {
  try {
    req.body.accepted = false
    const updateResult =
      await certificateRequestService.updateCertificateRequestById(
        req.params.id,
        req.body
      )
    if (updateResult && updateResult != 0) {
      await emailService.sendEmail(
        req.body.studentEmail,
        'Cerere adeverinta FIESC',
        'Cerere adeverinta FIESC',
        `<p>Buna ziua, solicitarea dumneavoastra cu privire la obtinerea unei adeverinte de student, in cadrul facultatii FIESC, a fost <span style="color:red;">respinsa!</span></p> <p>Motivul respingerei este: <b>${req.body.rejectedReason}</b>.</p> <p>Pentru mai multe detalii puteti sa va apropiati la secretariat incepand cu urmatoarea zi lucratoare.</p> <br/> <p>O zi buna!</p>`
      )
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

const loadCertificateRequestsFromSpreadSheet = async (req, res) => {
  try {
    let spreadsheetRequests = []
    try {
      spreadsheetRequests =
        await spreadsheetService.getUnprocessedCertificateRequests()
    } catch (error) {
      //console.log(error)
      //posible error: network error connection
    }

    await spreadsheetRequests.forEach(async (request) => {
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

const getCertificateRequests = async (req, res) => {
  try {
    let certificateRequests =
      await certificateRequestService.getAllCertificateRequests()
    console.log(req.query['processed'])
    if (req.query['processed'] != undefined) {
      if (req.query['processed'] == 'false' || req.query['processed'] == false)
        certificateRequests = certificateRequests.filter(
          (request) => request.handledBy === null || request.accepted === null
        )
      else if (
        req.query['processed'] == 'true' ||
        req.query['processed'] == true
      )
        certificateRequests = certificateRequests.filter(
          (request) => request.handledBy != null || request.accepted != null
        )
    }
    if (req.query['start-date'] && req.query['end-date']) {
      startDate = new Date(req.query['start-date'])
      startDate.setHours(0, 0, 0, 0)
      endDate = new Date(req.query['end-date'])
      endDate.setHours(23, 59, 59, 999)
      certificateRequests = certificateRequests.filter(
        (request) => request.date >= startDate && request.date <= endDate
      )
    }

    if (req.query['student-email'])
      certificateRequests = certificateRequests.filter(
        (request) => request.studentEmail === req.query['student-email']
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
    let isValid = await spreadsheetService.checkSpreadsheet(req.body)
    if (!isValid) {
      res.status(400).json({ message: 'Invalid spreadsheet data' })
      console.log('Invalid spreadsheet data')
      return
    }
    await spreadsheetService.updateSpreadsheet(req.body)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCertificateRequest,
  acceptCertificateRequest,
  rejectCertificateRequest,
  loadCertificateRequestsFromSpreadSheet,
  getCertificateRequests,
  getCertificateRequestById,
  updateCertificateRequestById,
  deleteCertificateRequestById,
  getSpreadsheet,
  updateSpreadsheet,
}
