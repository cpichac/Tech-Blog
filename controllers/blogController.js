// In homeController.js
const express = require('express');
const router = express.Router();
// controllers/blogController.js
const { BlogPost } = require('../models'); // Import your Sequelize model

// Controller function for creating a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body; // Assuming you have user authentication
    const newBlogPost = await BlogPost.create({ title, content, userId });
    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the blog post' });
  }
};

// Controller function for retrieving all blog posts
const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll();
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
};

// Controller function for retrieving a single blog post by ID
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

// Controller function for updating a blog post
const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
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

// Controller function for deleting a blog post
const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await blogPost.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the blog post' });
  }
};

module.exports = { createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost };
