// facultyService.js
const { Faculty } = require('../../models')

// Function to create a new faculty
async function createFaculty(facultyData) {
  try {
    return await Faculty.create(facultyData)
  } catch (error) {
    throw new Error('Error while creating faculty: ' + error.message)
  }
}

async function getAllFaculties() {
  try {
    return (await Faculty.findAll()).map((faculty) => faculty.dataValues)
  } catch (error) {
    throw new Error('Error while retrieving all faculties: ' + error.message)
  }
}

// Function to get a faculty by ID
async function getFacultyById(id) {
  try {
    return (await Faculty.findByPk(id))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving faculty with id='${id}': ` + error.message
    )
  }
}
async function getFacultyByShortName(shortName) {
  try {
    return (await Faculty.findOne({ where: { shortName } }))?.dataValues
  } catch (error) {
    throw new Error(
      `Error while retrieving faculty with shortName='${shortName}': ` +
        error.message
    )
  }
}

// Function to update a faculty
async function updateFacultyById(id, facultyData) {
  try {
    return await Faculty.update(facultyData, { where: { id } })
  } catch (error) {
    throw new Error(
      `Error while updating faculty with id='${id}': ` + error.message
    )
  }
}

// Function to delete a faculty
async function deleteFacultyById(id) {
  try {
    return await Faculty.destroy({ where: { id } })
  } catch (error) {
    throw new Error(
      `Error while deleting faculty with id='${id}': ` + error.message
    )
  }
}

// Export the functions
module.exports = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  getFacultyByShortName,
  updateFacultyById,
  deleteFacultyById,
}
