const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../../config/serviceAccountCreds.json')
const { JWT } = require('google-auth-library')
const { Spreadsheet } = require('../../models')

const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const GOOGLE_SPREADSHEET_ID =
  process.env.GOOGLE_SPREADSHEET_ID ||
  '1LVubIuhZGUrwlj2pB6nuq8W1B-34rhNzI43B30AQY80'

async function loadGooglespreadsheet() {
  try {
    let spreadsheet = await getSpreadsheet()
    if (!spreadsheet) {
      spreadsheet = await createSpreadsheet({
        googleSpreadsheetId: GOOGLE_SPREADSHEET_ID,
      })
    }
    const doc = new GoogleSpreadsheet(
      spreadsheet.googleSpreadsheetId,
      serviceAccountAuth
    )
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    return sheet
  } catch (error) {
    throw new Error(
      `Error during loading google spread sheet document: ` + error.message
    )
  }
}

async function getAllCertificateRequests() {
  try {
    const sheet = await loadGooglespreadsheet()
    const rows = await sheet.getRows()
    return rows.map((row) => {
      if (row._rawData[0] && row._rawData[1] && row._rawData[2]) {
        const [datePart, timePart] = row._rawData[0].split(' ')
        const [day, month, year] = datePart.split('.')
        const [hour, minute, second] = timePart.split(':')
        return {
          date: new Date(Date.UTC(year, month - 1, day, hour, minute, second)),
          studentEmail: row._rawData[1],
          certificatePurpose: row._rawData[2].trim(),
        }
      }
    })
  } catch (error) {
    throw new Error(
      `Error during retrieving all certificate requests from google spread sheet document: ` +
        error.message
    )
  }
}

async function getUnprocessedCertificateRequests() {
  const allCertificateRequests = await getAllCertificateRequests()
  const lastProcessedRow = await getLastProcessedRow()
  if (lastProcessedRow > allCertificateRequests.length) {
    //there something was bad. Set lastProcessedRow to last processed row from sheet
    await updateLastProcessedRow(allCertificateRequests.length)
    return allCertificateRequests
  }
  const unprocessedRequests = allCertificateRequests.slice(lastProcessedRow)
  if (unprocessedRequests.length !== 0)
    await updateLastProcessedRow(lastProcessedRow + unprocessedRequests.length)

  return unprocessedRequests
}

async function getCertificateRequestsByStudentEmail(studentEmail) {
  const allCertificateRequests = await getAllCertificateRequests()
  return allCertificateRequests.filter(
    (request) => request.studentEmail === studentEmail
  )
}

async function getCerificateRequestsByDate(date) {
  const allCertificateRequests = await getAllCertificateRequests()
  return allCertificateRequests.filter((request) =>
    request.date.toString().includes(date)
  )
}

async function getSpreadsheet() {
  try {
    return await Spreadsheet.findOne()
  } catch (error) {
    throw new Error(
      `Error during retrieving spread sheet in database: ` + error.message
    )
  }
}

async function createSpreadsheet(spreadsheetData) {
  try {
    const existingOne = await getSpreadsheet()
    if (existingOne) {
      return existingOne
    }
    return await Spreadsheet.create(spreadsheetData)
  } catch (error) {
    throw new Error(
      `Error during creating new spread sheet in database: ` + error.message
    )
  }
}

async function updateSpreadsheet(spreadsheetData) {
  try {
    return await Spreadsheet.update(spreadsheetData, {
      where: { id: spreadsheetData.id },
    })
  } catch (error) {
    throw new Error(
      `Error during updating spread sheet with id=${id} in database: ` +
        error.message
    )
  }
}

async function getLastProcessedRow() {
  let spreadsheet = await getSpreadsheet()
  if (!spreadsheet) {
    //if not exist create one
    spreadsheet = await createSpreadsheet({
      googleSpreadsheetId: GOOGLE_SPREADSHEET_ID,
    })
    return 0
  }
  return spreadsheet?.lastProcessedRow
}

// Function to update the index of the last processed row in the database
async function updateLastProcessedRow(lastProcessedRow) {
  let spreadsheet = await getSpreadsheet()
  if (!spreadsheet) {
    // If no row exists, create a new one
    spreadsheet = await await createSpreadsheet({
      googleSpreadsheetId: GOOGLE_SPREADSHEET_ID,
    })
  } else {
    // If a row exists, update the existing row
    spreadsheet.lastProcessedRow = lastProcessedRow
    await spreadsheet.save()
  }
}

module.exports = {
  getSpreadsheet,
  updateSpreadsheet,
  getAllCertificateRequests,
  getUnprocessedCertificateRequests,
  getCertificateRequestsByStudentEmail,
  getCerificateRequestsByDate,
}
