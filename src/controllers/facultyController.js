const facultyService = require('../services/facultyService')

const createFaculty = async (req, res) => {
  try {
    // check if faculty already exists
    if (
      (await facultyService.getFacultyByShortName(req.body.shortName)) != null
    ) {
      res.status(409).json({
        message: `Faculty with shortName='${req.body.shortName}' already exists`,
      })
      return
    }
    await facultyService.createFaculty(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await facultyService.getAllFaculties()
    res.json(faculties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getFacultyById = async (req, res) => {
  try {
    const faculty = await facultyService.getFacultyById(req.params.id)
    if (faculty) {
      res.json(faculty)
    } else {
      res
        .status(404)
        .json({ message: `Faculty with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateFacultyById = async (req, res) => {
  try {
    const updateResult = await facultyService.updateFacultyById(
      req.params.id,
      req.body
    )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res
        .status(404)
        .json({ message: `Faculty with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteFacultyById = async (req, res) => {
  try {
    const deleteResult = await facultyService.deleteFacultyById(req.params.id)
    if (deleteResult) {
      res
        .status(204)
        .json({ message: `Faculty with id='${req.params.id}' was deleted` })
    } else {
      res
        .status(404)
        .json({ message: `Faculty with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
}
