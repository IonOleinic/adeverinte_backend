const facultyRoutes = require('express').Router()
const facultyController = require('../controllers/facultyController')

facultyRoutes.post('/faculty', facultyController.createFaculty)

facultyRoutes.get('/faculties', facultyController.getAllFaculties)

facultyRoutes.get('/faculty/:id', facultyController.getFacultyById)

facultyRoutes.put('/faculty/:id', facultyController.updateFacultyById)

facultyRoutes.delete('/faculty/:id', facultyController.deleteFacultyById)

module.exports = facultyRoutes
