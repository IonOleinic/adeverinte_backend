// Certificate Model.js
module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    registrationNr: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    studentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
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
    certificatePurpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    printed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
  })

  return Certificate
}
