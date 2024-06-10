const reportService = require('../services/reportService')

const getCertificatesReport = async (req, res) => {
  try {
    const reportBuffer = await reportService.generateCertificatesReport(
      req.query['start_date'],
      req.query['end_date'],
      JSON.parse(req.query.fields),
      JSON.parse(req.query.exportedFields)
    )

    // Setează header-ul pentru descărcare
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=raport_adeverinte.xlsx'
    )
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    // Trimite buffer-ul ca răspuns
    res.send(reportBuffer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getRequestsReport = async (req, res) => {
  try {
    const reportBuffer = await reportService.generateRequestsReport(
      req.query['start_date'],
      req.query['end_date'],
      JSON.parse(req.query.fields),
      JSON.parse(req.query.exportedFields)
    )

    // Setează header-ul pentru descărcare
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=raport_cereri.xlsx'
    )
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    // Trimite buffer-ul ca răspuns
    res.send(reportBuffer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCertificatesReport, getRequestsReport }
