const studentService = require('../services/studentService')

const createStudent = async (req, res) => {
  try {
    let failedStudents = []
    if (Array.isArray(req.body)) {
      await studentService.deleteAllStudents()
      for (let i = 0; i < req.body.length; i++) {
        //try add student
        try {
          await studentService.createStudent(req.body[i])
        } catch (error) {
          failedStudents.push({ student: req.body[i], message: error.message })
        }
      }
      if (failedStudents.length > 0) {
        res.status(201).json({ failedStudents })
      } else {
        res.sendStatus(201)
      }
      return
    } else {
      //check if student already exists
      if ((await studentService.getStudentByEmail(req.body.email)) != null) {
        res.status(409).json({
          message: `Student with email='${req.body.email}' already exists`,
        })
        return
      }
      await studentService.createStudent(req.body)
      res.sendStatus(201)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents()
    res.json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id)
    if (student) {
      res.json(student)
    } else {
      res
        .status(404)
        .json({ message: `Student with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getStudentByEmail = async (req, res) => {
  try {
    const student = await studentService.getStudentByEmail(req.query.email)
    if (student) {
      res.json(student)
    } else {
      res.status(404).json({
        message: `Student with email='${req.query.email}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateStudentById = async (req, res) => {
  try {
    const updateResult = await studentService.updateStudentById(
      req.params.id,
      req.body
    )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res
        .status(404)
        .json({ message: `Student with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateStudentByEmail = async (req, res) => {
  try {
    const updateResult = await studentService.updateStudentByEmail(
      req.query.email,
      req.body
    )
    if (updateResult && updateResult != 0) {
      res.status(204).json(updateResult)
    } else {
      res.status(404).json({
        message: `Student with email='${req.query.email}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteStudentById = async (req, res) => {
  try {
    const deleteResult = await studentService.deleteStudentById(req.params.id)
    if (deleteResult) {
      res
        .status(204)
        .json({ message: `Student with id='${req.params.id}' was deleted` })
    } else {
      res
        .status(404)
        .json({ message: `Student with id='${req.params.id}' doesn't exist` })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteStudentByEmail = async (req, res) => {
  try {
    const deleteResult = await studentService.deleteStudentByEmail(
      req.query.email
    )
    if (deleteResult) {
      res.status(204).json({
        message: `Student with email='${req.query.email}' was deleted`,
      })
    } else {
      res.status(404).json({
        message: `Student with email='${req.query.email}' doesn't exist`,
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  getStudentByEmail,
  createStudent,
  updateStudentById,
  updateStudentByEmail,
  deleteStudentById,
  deleteStudentByEmail,
}
