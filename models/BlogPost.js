// models/BlogPost.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    // Model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // This references the 'user' model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'blogPost',
    timestamps: true,
    createdAt: 'created_at', // Customize the createdAt field name
    updatedAt: 'updated_at', // Customize the updatedAt field name
  }
);

module.exports = BlogPost;
