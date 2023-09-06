// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    // Model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // We imported the Sequelize connection
    modelName: 'user', // Model name (used in queries)
    timestamps: false, // Set to true if you want createdAt and updatedAt fields
  }
);

module.exports = User;
