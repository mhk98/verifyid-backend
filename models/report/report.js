const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const report = sequelize.define("report", {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    Email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },

    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Favorite_colors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return report;
};
