const { Certificate } = require('../../models')
const studentService = require('./studentService')
const sequelize = require('sequelize')
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

    return await Certificate.create({
      ...certificateData,
      ...student,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  } catch (error) {
    throw new Error('Error while creating certificate: ' + error.message)
  }
}

async function getAllCertificates() {
  try {
    return (
      await Certificate.findAll({
        order: [
          // Sort by "printed" field in ascending order, with null or false values first
          [
            sequelize.literal(
              'CASE WHEN printed IS NULL OR printed = false THEN 0 ELSE 1 END'
            ),
            'ASC',
          ],
          // Then, sort by "date" field in descending order
          ['createdAt', 'DESC'],
        ],
      })
    ).map((certificate) => certificate.dataValues)
  } catch (error) {
    throw new Error('Error while retrieving all certificates: ' + error.message)
  }
}

async function getCertificatesByDateInterval(startDate, endDate) {
  try {
    let certificates = await getAllCertificates()
    if (startDate) {
      startDate = new Date(startDate)
      startDate.setHours(0, 0, 0, 0)
      certificates = certificates.filter(
        (certificate) => certificate.createdAt >= startDate
      )
    }
    if (endDate) {
      endDate = new Date(endDate)
      endDate.setHours(23, 59, 59, 999)
      certificates = certificates.filter(
        (certificate) => certificate.createdAt <= endDate
      )
    }
    return certificates
  } catch (error) {
    throw new Error(
      `Error while retrieving certificates between ${startDate} and ${endDate}: ` +
        error.message
    )
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
  getCertificatesByDateInterval,
  getCertificateByRegistrationNr,
  deleteCertificateByRegistrationNr,
  updateCertificateByRegistrationNr,
  deleteAllCertificates,
}
