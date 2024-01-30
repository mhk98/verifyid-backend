const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const userNotification = sequelize.define("userNotification", {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Contact: {
      type: DataTypes.STRING,
    },

    Location: {
      type: DataTypes.STRING,
    },

    IdNumber: {
      type: DataTypes.STRING,
    },
  });

  return userNotification;
};
