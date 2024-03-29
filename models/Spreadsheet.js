// userModel.js
module.exports = (sequelize, DataTypes) => {
  const Spreadsheet = sequelize.define(
    'Spreadsheet',
    {
      googleSpreadsheetId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastProcessedRow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  )
  return Spreadsheet
}
