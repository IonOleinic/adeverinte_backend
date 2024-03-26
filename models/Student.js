// Student Model.js
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    email: {
      // firstName.LastName@student.usv.ro
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    studyProgram: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '-',
    },
    studyCycle: {
      // licenta, masterat, studii postuniversitare, conversie profesionala
      type: DataTypes.STRING,
      allowNull: false,
    },
    studyYear: {
      // 1, 2, 3, 4
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studyDomain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    educationForm: {
      // IF, ID
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'IF',
    },
    financing: {
      // buget, taxa
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'buget',
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      // M, F
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return Student
}
