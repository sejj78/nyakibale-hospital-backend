const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pharmacist = sequelize.define('Pharmacist', {
  pharmacist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
});

module.exports = Pharmacist;
