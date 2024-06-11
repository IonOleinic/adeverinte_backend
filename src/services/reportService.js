const XLSX = require('xlsx')
const certificateService = require('./certificateService')
const certificateRequestService = require('./certificateRequestService')
const emailService = require('./emailService')

async function generateCertificatesReport(startDate, endDate, exportedFields) {
  try {
    const fieldNames = {
      registrationNr: 'Nr înregistrare',
      createdAt: 'Data',
      fullName: 'Nume complet',
      studyDomain: 'Domeniu de studii',
      studyProgram: 'Program de studii',
      educationForm: 'Forma de învățământ',
      studyCycle: 'Ciclu de studii',
      studyYear: 'An',
      financing: 'Finanțare',
      certificatePurpose: 'Scopul',
    }

    exportedFields = exportedFields || {
      registrationNr: true,
      createdAt: true,
      fullName: true,
      studyDomain: true,
      studyProgram: true,
      educationForm: true,
      studyCycle: true,
      studyYear: true,
      financing: true,
      certificatePurpose: true,
    }

    startDate = startDate ? new Date(startDate) : null
    endDate = endDate ? new Date(endDate) : null

    let certificates = await certificateService.getCertificatesByDateInterval(
      startDate,
      endDate
    )

    const dates = certificates.map(
      (certificate) => new Date(certificate.createdAt)
    )
    let formattedStartDate = startDate
      ? startDate.toLocaleDateString('ro-RO')
      : '?'
    let formattedEndDate = endDate ? endDate.toLocaleDateString('ro-RO') : '?'

    if (dates.length !== 0) {
      formattedStartDate = startDate
        ? startDate.toLocaleDateString('ro-RO')
        : new Date(Math.min(...dates)).toLocaleDateString('ro-RO')
      formattedEndDate = endDate
        ? endDate.toLocaleDateString('ro-RO')
        : new Date(Math.max(...dates)).toLocaleDateString('ro-RO')
    }

    // Formatarea datelor și maparea câmpurilor exportate
    const dataToExport = certificates.map((certificate) => {
      certificate.createdAt = new Date(
        certificate.createdAt
      ).toLocaleDateString('ro-RO')
      return Object.keys(exportedFields)
        .filter((key) => exportedFields[key])
        .map((key) => {
          const value = certificate[key.replace('Checked', '')]
          return value ? value.toString() : '-'
        })
    })

    // Adăugarea unui rând de antet
    const titleRow = ['Raport Adeverințe']
    const periodRow = [`Perioada ${formattedStartDate} - ${formattedEndDate}`]
    const headers = Object.keys(exportedFields)
      .filter((key) => exportedFields[key])
      .map((key) => fieldNames[key.replace('Checked', '')])

    // Adăugarea rândurilor personalizate și a datelor
    const worksheetData = [titleRow, periodRow, headers, ...dataToExport]

    // Calcularea lățimii coloanelor pe baza celui mai lung text din fiecare coloană
    const colWidths = headers.map((_, colIndex) => {
      const maxFieldLength = Math.max(
        ...worksheetData.slice(2).map((row) => row[colIndex].toString().length)
      )
      return { wch: maxFieldLength }
    })

    const ws = XLSX.utils.aoa_to_sheet(worksheetData)
    ws['!cols'] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Raport Adeverințe')

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })

    return wbout
  } catch (error) {
    console.error('Error generating certificates report:', error)
    throw error
  }
}

async function generateRequestsReport(startDate, endDate, exportedFields) {
  try {
    const fieldNames = {
      studentEmail: 'Email student',
      date: 'Data',
      accepted: 'Acceptată',
      handledBy: 'Procesată de',
      rejectedReason: 'Motiv respingere',
      certificatePurpose: 'Scopul adeverinței',
    }

    exportedFields = exportedFields || {
      studentEmail: true,
      date: true,
      certificatePurpose: true,
      handledBy: true,
      accepted: true,
      rejectedReason: true,
    }

    startDate = startDate ? new Date(startDate) : null
    endDate = endDate ? new Date(endDate) : null

    let requests = await certificateRequestService.getRequestsByDateInterval(
      startDate,
      endDate
    )
    const dates = requests.map((request) => new Date(request.date))
    let formattedStartDate = startDate
      ? startDate.toLocaleDateString('ro-RO')
      : '?'
    let formattedEndDate = endDate ? endDate.toLocaleDateString('ro-RO') : '?'

    if (dates.length !== 0) {
      formattedStartDate = startDate
        ? startDate.toLocaleDateString('ro-RO')
        : new Date(Math.min(...dates)).toLocaleDateString('ro-RO')
      formattedEndDate = endDate
        ? endDate.toLocaleDateString('ro-RO')
        : new Date(Math.max(...dates)).toLocaleDateString('ro-RO')
    }

    // Formatarea datelor și maparea câmpurilor exportate
    const dataToExport = requests.map((request) => {
      request.date = new Date(request.date).toLocaleDateString('ro-RO')
      request.accepted = request.accepted ? 'Da' : 'Nu'
      return Object.keys(exportedFields)
        .filter((key) => exportedFields[key])
        .map((key) => {
          const value = request[key.replace('Checked', '')]
          return value ? value.toString() : '-'
        })
    })

    // Create custom header rows
    const titleRow = ['Raport Cereri']
    const periodRow = [`Perioada ${formattedStartDate} - ${formattedEndDate}`]
    const headers = Object.keys(exportedFields)
      .filter((key) => exportedFields[key])
      .map((key) => fieldNames[key.replace('Checked', '')])

    // Add custom rows and data
    const worksheetData = [titleRow, periodRow, headers, ...dataToExport]

    // Calculate column widths based on the longest text in each column
    const colWidths = headers.map((_, colIndex) => {
      const maxFieldLength = Math.max(
        ...worksheetData.slice(2).map((row) => row[colIndex].toString().length)
      )
      return { wch: maxFieldLength }
    })

    const ws = XLSX.utils.aoa_to_sheet(worksheetData)
    ws['!cols'] = colWidths

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Raport Cereri')

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' })

    return wbout
  } catch (error) {
    console.error('Error generating certificate requests report:', error)
    throw error
  }
}

async function sendDailyCertRepEmail(usersEmails) {
  try {
    const exportedFields = {
      registrationNr: true,
      createdAt: true,
      fullName: true,
      studyDomain: false,
      studyProgram: false,
      educationForm: false,
      studyCycle: false,
      studyYear: false,
      financing: false,
      certificatePurpose: true,
    }
    const now = new Date()
    const certificates = await certificateService.getCertificatesByDateInterval(
      now,
      now
    )
    if (certificates.length === 0) {
      console.log(
        `No certificates to report for today (${now.toLocaleDateString(
          'ro-RO'
        )}). Skipping sendDailyCertRepEmail`
      )
      return
    }
    const buffer = await generateCertificatesReport(now, now, exportedFields)
    const date = now.toLocaleDateString('ro-RO')
    for (const email of usersEmails) {
      await emailService.sendReportEmail(
        email,
        'Raport Adeverințe',
        `Raport adeverinte pentru data de ${date}`,
        `<p>Raport adeverinte pentru data de ${date}</p>`,
        buffer
      )
    }
  } catch (error) {
    console.error('Error in generateAndSendReport:', error)
  }
}

module.exports = {
  generateCertificatesReport,
  generateRequestsReport,
  sendDailyCertRepEmail,
}
