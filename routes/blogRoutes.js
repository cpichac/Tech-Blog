// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const { createBlogPost } = require('../controllers/blogController');

router.post('/create', createBlogPost);
// routes/blogRoutes.js

const { getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } = require('../controllers/blogController');

router.get('/', getBlogPosts);

router.get('/:id', getBlogPostById);

router.put('/edit/:id', updateBlogPost);

router.delete('/delete/:id', deleteBlogPost);



module.exports = router;
