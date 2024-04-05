const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
            res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;