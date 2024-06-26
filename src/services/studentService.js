const { Student } = require('../../models')

/**
 * Creates a new student.
 * @param {Object} studentData - The data of the student to create.
 * @returns {Promise<Object>} The created student.
 * @throws {Error} If there is an error while creating the student.
 */
async function createStudent(studentData) {
  try {
    return await Student.create(studentData)
  } catch (error) {
    throw new Error('Error while creating student: ' + error.message)
  }
}

/**
 * Retrieves all students.
 * @returns {Promise<Object[]>} A list of all students.
 * @throws {Error} If there is an error while retrieving all students.
 */
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

/**
 * Retrieves a student by email.
 * @param {string} email - The email of the student to retrieve.
 * @returns {Promise<Object|null>} The student with the given email, or null if not found.
 * @throws {Error} If there is an error while retrieving the student.
 */
async function getStudentByEmail(email) {
  try {
    return (await Student.findOne({ where: { email } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving student with email='${email}': ` + error.message
    )
  }
}

/**
 * Retrieves a student by ID.
 * @param {number|string} id - The ID of the student to retrieve.
 * @returns {Promise<Object|null>} The student with the given ID, or null if not found.
 * @throws {Error} If there is an error while retrieving the student.
 */
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

/**
 * Updates a student by email.
 * @param {string} email - The email of the student to update.
 * @param {Object} studentData - The new data for the student.
 * @returns {Promise<Array<number, Object[]>>} The result of the update operation.
 * @throws {Error} If there is an error while updating the student.
 */
async function updateStudentByEmail(email, studentData) {
  try {
    return await Student.update(studentData, { where: { email } })
  } catch (error) {
    throw new Error(
      `Error while updating student with email='${email}': ` + error.message
    )
  }
}

/**
 * Updates a student by ID.
 * @param {number|string} id - The ID of the student to update.
 * @param {Object} studentData - The new data for the student.
 * @returns {Promise<Array<number, Object[]>>} The result of the update operation.
 * @throws {Error} If there is an error while updating the student.
 */
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

/**
 * Deletes a student by email.
 * @param {string} email - The email of the student to delete.
 * @returns {Promise<number>} The number of rows deleted.
 * @throws {Error} If there is an error while deleting the student.
 */
async function deleteStudentByEmail(email) {
  try {
    return await Student.destroy({ where: { email } })
  } catch (error) {
    throw new Error(
      `Error while deleting student with email='${email}': ` + error.message
    )
  }
}

/**
 * Deletes a student by ID.
 * @param {number|string} id - The ID of the student to delete.
 * @returns {Promise<number>} The number of rows deleted.
 * @throws {Error} If there is an error while deleting the student.
 */
async function deleteStudentById(id) {
  try {
    return await Student.destroy({ where: { id } })
  } catch (error) {
    throw new Error(
      `Error while deleting student with id='${id}': ` + error.message
    )
  }
}

/**
 * Deletes all students.
 * @returns {Promise<number>} The number of rows deleted.
 * @throws {Error} If there is an error while deleting all students.
 */
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
