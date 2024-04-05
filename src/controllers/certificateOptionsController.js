const certificateOptionsService = require('../services/certificateOptionsService')

const createCertificateOptions = async (req, res) => {
  try {
    if (
      !req.body.mask?.includes('[data]') ||
      !req.body.mask?.includes('i') ||
      !req.body.mask?.includes('NR')
    ) {
      res.status(400).json({
        message: 'The options mask must contain NR, i, and [date]',
      })
      return
    }
    await certificateOptionsService.createCertificateOptions(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getLastUsedMask = async (req, res) => {
  try {
    const mask = await certificateOptionsService.getLastUsedMask()
    if (mask) {
      res.json(mask)
    } else {
      res.json(process.env.DEFAULT_MASK || 'NR.A.i/[data]')
    }
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
    if (
      !req.body.mask?.includes('[data]') ||
      !req.body.mask?.includes('i') ||
      !req.body.mask?.includes('NR')
    ) {
      res.status(400).json({
        message: 'The options mask must contain NR, i, and [date]',
      })
      return
    }
    const updateResult =
      await certificateOptionsService.updateCertificateOptionsByDate(
        req.params.date,
        req.body
      )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      const certificateOptions =
        await certificateOptionsService.createCertificateOptions(req.body)
      res.status(201).json(certificateOptions)
      // res.status(404).json({
      //   message: `Certificate options with date='${req.params.date}' doesn't exist`,
      // })
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
  getLastUsedMask,
}
