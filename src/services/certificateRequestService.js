const { CertificateRequest } = require('../../models')

async function createCertificateRequest(certificateRequestData) {
  try {
    return await CertificateRequest.create(certificateRequestData)
  } catch (error) {
    throw new Error(
      'Error while creating certificate request: ' + error.message
    )
  }
}

async function getAllCertificateRequests() {
  try {
    return (
      await CertificateRequest.findAll({
        order: [['date', 'DESC']], // Sort by createdAt in descending order
      })
    ).map((data) => data.dataValues)
  } catch (error) {
    throw new Error(
      'Error while retrieving all certificate requests: ' + error.message
    )
  }
}

async function getCertificateRequestById(id) {
  try {
    return (await CertificateRequest.findOne({ where: { id } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving certificate request with id='${id}': ` +
        error.message
    )
  }
}

async function getCertificateRequestByDate(date) {
  try {
    return (await CertificateRequest.findOne({ where: { date } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving certificate request with date='${date}': ` +
        error.message
    )
  }
}

async function updateCertificateRequestById(id, certificateRequestData) {
  try {
    return await CertificateRequest.update(certificateRequestData, {
      where: { id },
    })
  } catch (error) {
    throw new Error(
      `Error while updating certificate request with id='${id}': ` +
        error.message
    )
  }
}

async function deleteCertificateRequestById(id) {
  try {
    return await CertificateRequest.destroy({ where: { id } })
  } catch (error) {
    throw new Error(
      `Error while deleting certificate request with id='${id}': ` +
        error.message
    )
  }
}

module.exports = {
  createCertificateRequest,
  getAllCertificateRequests,
  getCertificateRequestById,
  getCertificateRequestByDate,
  updateCertificateRequestById,
  deleteCertificateRequestById,
}
