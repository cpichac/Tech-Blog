// In homeController.js
const express = require('express');
const router = express.Router();
// Import necessary modules and dependencies
const { BlogPost } = require('../models'); // Import your Sequelize BlogPost model

// Controller function for retrieving all blog posts for the home page
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll();
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
};

// Controller function for retrieving a specific blog post by ID
const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching the blog post' });
  }
};

module.exports = { getAllBlogPosts, getBlogPostById };
