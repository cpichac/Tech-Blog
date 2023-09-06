// In homeController.js
const express = require('express');
const router = express.Router();
// Import necessary modules and dependencies
const { Comment } = require('../models'); // Import your Sequelize Comment model

// Controller function for creating a new comment
const createComment = async (req, res) => {
  try {
    const { text, userId, postId } = req.body;
    const newComment = await Comment.create({ text, userId, postId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the comment' });
  }
};

// Controller function for retrieving comments for a specific blog post
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { postId } });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// Controller function for updating a comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.text = text;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the comment' });
  }
};

// Controller function for deleting a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the comment' });
  }
};

module.exports = { createComment, getCommentsByPostId, updateComment, deleteComment };
