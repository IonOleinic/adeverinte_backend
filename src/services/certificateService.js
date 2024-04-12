const { Certificate } = require('../../models')
const studentService = require('./studentService')
const certificateOptionsService = require('./certificateOptionsService')

async function createCertificate(certificateData) {
  try {
    // Check if student exists
    const student = await studentService.getStudentByEmail(
      certificateData.studentEmail
    )
    if (!student)
      throw new Error(
        `Student with email='${certificateData.studentEmail}' does not exist in database.`
      )
    if (!certificateData.registrationNr) {
      certificateData.registrationNr = await generateRegistrationNumber()
      if (!certificateData.registrationNr)
        throw new Error(
          'Registration number cannot be generated. Please verify certificate options. If it is the first time, please create certificate options first.'
        )
    }

    return await Certificate.create({ ...certificateData, ...student })
  } catch (error) {
    throw new Error('Error while creating certificate: ' + error.message)
  }
}

async function getAllCertificates() {
  try {
    return (await Certificate.findAll()).map((data) => data.dataValues)
  } catch (error) {
    throw new Error('Error while retrieving all certificates: ' + error.message)
  }
}

async function getCertificateByRegistrationNr(registrationNr) {
  try {
    const certificate = (
      await Certificate.findOne({
        where: { registrationNr },
      })
    )?.dataValues
    return certificate
  } catch (error) {
    throw new Error(
      `Error while retrieving certificate with registrationNr='${registrationNr}': ` +
        error.message
    )
  }
}

async function getStudentCertificates(studentEmail) {
  try {
    return (
      await Certificate.findAll({
        where: { studentEmail },
      })
    ).map((data) => data.dataValues)
  } catch (error) {
    throw new Error(
      `Error while retrieving certificates for student with email='${studentEmail}'` +
        error.message
    )
  }
}

async function updateCertificateByRegistrationNr(
  registrationNr,
  certificateData
) {
  try {
    return await Certificate.update(certificateData, {
      where: { registrationNr },
    })
  } catch (error) {
    throw new Error(
      `Error while updating certificate with registrationNr='${registrationNr}'` +
        error.message
    )
  }
}

async function deleteCertificateByRegistrationNr(registrationNr) {
  try {
    return await Certificate.destroy({ where: { registrationNr } })
  } catch (error) {
    throw new Error(
      `Error while deleting certificate with registrationNr='${registrationNr}': ` +
        error.message
    )
  }
}

async function deleteAllCertificates() {
  try {
    return await Certificate.destroy({ where: {} })
  } catch (error) {
    throw new Error('Error while deleting all certificates: ' + error.message)
  }
}

async function generateRegistrationNumber() {
  const currentDate = new Date()
  let certOpt = await certificateOptionsService.getCertificateOptionsByDate(
    currentDate
  )
  if (!certOpt) return undefined
  // If a record exists for the current date, increment the count
  await certOpt.increment('dailyCount')
  const formattedDate = currentDate
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .split('/')
    .join('.')
  return certOpt.mask
    .replace('i', certOpt.dailyCount)
    .replace('NR', certOpt.NR)
    .replace('[data]', formattedDate)
}

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateByRegistrationNr,
  getStudentCertificates,
  deleteCertificateByRegistrationNr,
  updateCertificateByRegistrationNr,
  deleteAllCertificates,
}
