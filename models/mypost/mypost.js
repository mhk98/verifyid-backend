const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const mypost = sequelize.define("mypost", {
    mypost_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Contact: {
      type: DataTypes.STRING,
    },
    Identification: {
      type: DataTypes.STRING,
    },
    IdNumber: {
      type: DataTypes.STRING,
    },
    Location: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.STRING,
    },
  });

  return mypost;
};
