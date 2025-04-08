const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inventory = sequelize.define('Inventory', {
  medicine_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiry_date: {
    type: DataTypes.DATE,
  },
});

module.exports = Inventory;
