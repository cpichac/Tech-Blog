// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const { getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } = require('../controllers/blogController');

// routes/blogRoutes.js
router.post('/create', createBlogPost);

router.get('/', getBlogPosts);

router.get('/:id', getBlogPostById);

router.put('/edit/:id', updateBlogPost);

router.delete('/delete/:id', deleteBlogPost);



module.exports = router;
