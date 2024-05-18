const studentService = require('../services/studentService')

const createStudent = async (req, res) => {
  try {
    let failedStudents = []
    if (Array.isArray(req.body)) {
      // array of students
      // await studentService.deleteAllStudents()
      const studentsArrayData = req.body
      for (let i = 0; i < studentsArrayData.length; i++) {
        //try add student
        try {
          await studentService.createStudent(studentsArrayData[i])
        } catch (error) {
          failedStudents.push(studentsArrayData[i])
        }
      }
      if (failedStudents.length > 0) {
        res.status(201).json({ failedStudents })
      } else {
        res.sendStatus(201)
      }
      return
    } else {
      //single student object
      const studentData = req.body
      //check if student already exists
      if ((await studentService.getStudentByEmail(studentData.email)) != null) {
        res.status(409).json({
          message: `Student with email='${studentData.email}' already exists`,
        })
        return
      }
      await studentService.createStudent(studentData)
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

const deleteAllStudents = async (req, res) => {
  try {
    await studentService.deleteAllStudents()
    res.status(204).json({ message: 'All students were deleted' })
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
  deleteAllStudents,
}
