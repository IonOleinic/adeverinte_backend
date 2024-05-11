const { Student } = require('../../models')

async function createStudent(studentData) {
  try {
    return await Student.create(studentData)
  } catch (error) {
    throw new Error('Error while creating student: ' + error.message)
  }
}

async function getAllStudents() {
  try {
    return (
      await Student.findAll({
        order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
      })
    ).map((student) => student.dataValues)
  } catch (error) {
    throw new Error('Error while retrieving all students: ' + error.message)
  }
}

async function getStudentByEmail(email) {
  try {
    return (await Student.findOne({ where: { email } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving student with email='${email}': ` + error.message
    )
  }
}

async function getStudentById(id) {
  try {
    id = Number(id)
    return (await Student.findOne({ where: { id } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving student with id='${id}': ` + error.message
    )
  }
}

async function updateStudentByEmail(email, studentData) {
  try {
    return await Student.update(studentData, { where: { email } })
  } catch (error) {
    throw new Error(
      `Error while updating student with email='${email}': ` + error.message
    )
  }
}

async function updateStudentById(id, studentData) {
  try {
    id = Number(id)
    return await Student.update(studentData, { where: { id } })
  } catch (error) {
    throw new Error(
      `Error while updating student with id='${id}': ` + error.message
    )
  }
}

async function deleteStudentByEmail(email) {
  try {
    return await Student.destroy({ where: { email } })
  } catch (error) {
    throw new Error(
      `Error while deleting student with email='${email}': ` + error.message
    )
  }
}

async function deleteStudentById(id) {
  try {
    return await Student.destroy({ where: { id } })
  } catch (error) {
    throw new Error(
      `Error while deleting student with id='${id}': ` + error.message
    )
  }
}

async function deleteAllStudents() {
  try {
    return await Student.destroy({ where: {} })
  } catch (error) {
    throw new Error(`Error while deleting all students: ` + error.message)
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByEmail,
  getStudentById,
  deleteStudentByEmail,
  deleteStudentById,
  updateStudentByEmail,
  updateStudentById,
  deleteAllStudents,
}
