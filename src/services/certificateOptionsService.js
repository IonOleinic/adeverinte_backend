const { CertificateOptions } = require('../../models')

async function createCertificateOptions(certificateOptionsData) {
  try {
    return await CertificateOptions.create(certificateOptionsData)
  } catch (error) {
    throw new Error(
      'Error while creating certificate options: ' + error.message
    )
  }
}

async function getLastUsedMask() {
  try {
    return (
      await CertificateOptions.findOne({
        order: [['date', 'DESC']],
      })
    )?.mask
  } catch (error) {
    throw new Error('Error while retrieving last used mask: ' + error.message)
  }
}

async function getAllCertificateOptions() {
  try {
    return (await CertificateOptions.findAll()).map((data) => data.dataValues)
  } catch (error) {
    throw new Error(
      `Error while retrieving all certificate options: ` + error.message
    )
  }
}

async function getCertificateOptionsByDate(date) {
  try {
    if (!date) date = new Date()
    return await CertificateOptions.findOne({ where: { date } })
  } catch (error) {
    throw new Error(
      `Error while retrieving certificate options with date=${date}:` +
        error.message
    )
  }
}

async function updateCertificateOptionsByDate(date, certificateOptionsData) {
  try {
    if (!date) date = new Date()
    //certificateOptionsData.dailyCount = 0 //reset count when updating
    return await CertificateOptions.update(certificateOptionsData, {
      where: { date },
    })
  } catch (error) {
    throw new Error(
      `Error while updating certificate options with date=${date}: ` +
        error.message
    )
  }
}

async function deleteCertificateOptionsByDate(date) {
  try {
    if (!date) date = new Date()
    return await CertificateOptions.destroy({ where: { date } })
  } catch (error) {
    throw new Error(
      `Error while deleting certificate options with date=${date}: ` +
        error.message
    )
  }
}

module.exports = {
  createCertificateOptions,
  getAllCertificateOptions,
  getCertificateOptionsByDate,
  updateCertificateOptionsByDate,
  deleteCertificateOptionsByDate,
  getLastUsedMask,
}
