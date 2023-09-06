// In homeController.js
const express = require('express');
const router = express.Router();
// Import necessary modules and dependencies
const { BlogPost } = require('../models'); // Import your Sequelize BlogPost model

// Controller function for retrieving all blog posts created by the current user
const getUserBlogPosts = async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication
  try {
    const userBlogPosts = await BlogPost.findAll({ where: { userId } });
    res.status(200).json(userBlogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user blog posts' });
  }
};

// Controller function for creating a new blog post
const createBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Assuming you have user authentication
  try {
    const newBlogPost = await BlogPost.create({ title, content, userId });
    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the blog post' });
  }
};

// Controller function for updating a user's blog post
const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    // Check if the user owns the blog post
    if (blogPost.userId !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this post' });
    }
    blogPost.title = title;
    blogPost.content = content;
    await blogPost.save();
    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the blog post' });
  }
};

// Controller function for deleting a user's blog post
const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    // Check if the user owns the blog post
    if (blogPost.userId !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this post' });
    }
    await blogPost.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the blog post' });
  }
};

module.exports = { getUserBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost };

