const certificateOptionsService = require('../services/certificateOptionsService')

const createCertificateOptions = async (req, res) => {
  try {
    await certificateOptionsService.createCertificateOptions(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllCertificateOptions = async (req, res) => {
  try {
    const certificateOptions =
      await certificateOptionsService.getAllCertificateOptions()
    res.json(certificateOptions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCertificateOptionsByDate = async (req, res) => {
  try {
    const certificateOptions =
      await certificateOptionsService.getCertificateOptionsByDate(
        req.params.date
      )
    if (certificateOptions) {
      res.json(certificateOptions)
    } else {
      res.status(404).json({
        message: `Certificate options with date='${req.params.date}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCertificateOptionsByDate = async (req, res) => {
  try {
    const updateResult =
      await certificateOptionsService.updateCertificateOptionsByDate(
        req.params.date,
        req.body
      )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res.status(404).json({
        message: `Certificate options with date='${req.params.date}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCertificateOptionsByDate = async (req, res) => {
  try {
    const deleteResult =
      await certificateOptionsService.deleteCertificateOptionsByDate(
        req.params.date
      )
    if (deleteResult && deleteResult != 0) {
      res.status(204).json(deleteResult)
    } else {
      res.status(404).json({
        message: `Certificate options with date='${req.params.date}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCertificateOptions,
  getAllCertificateOptions,
  getCertificateOptionsByDate,
  updateCertificateOptionsByDate,
  deleteCertificateOptionsByDate,
}
