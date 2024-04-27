const studentRoutes = require('express').Router()
const studentController = require('../controllers/studentController')

studentRoutes.post('/student', studentController.createStudent)

studentRoutes.get('/students', studentController.getAllStudents)

studentRoutes.get('/student/:id', studentController.getStudentById)
studentRoutes.get('/student', studentController.getStudentByEmail)

studentRoutes.put('/student/:id', studentController.updateStudentById)
studentRoutes.put('/student', studentController.updateStudentByEmail)

studentRoutes.delete('/student/:id', studentController.deleteStudentById)
studentRoutes.delete('/student', studentController.deleteStudentByEmail)
studentRoutes.delete('/students', studentController.deleteAllStudents)

module.exports = studentRoutes
