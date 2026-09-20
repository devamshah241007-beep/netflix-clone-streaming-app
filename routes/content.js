const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const { type, genre, search } = req.query;
    let query = {};

    // Validate query parameters as strings to prevent NoSQL operator injection
    if (type && typeof type === 'string') query.type = type;
    if (genre && typeof genre === 'string') query.genre = genre;
    if (search && typeof search === 'string') {
      // Escape special characters to prevent ReDoS
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } }
      ];
    }

    const content = await Content.find(query).sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get trending content
router.get('/trending', async (req, res) => {
  try {
    const content = await Content.find({ trending: true }).limit(10);
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured content
router.get('/featured', async (req, res) => {
  try {
    const content = await Content.findOne({ featured: true });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    // Increment views
    content.views += 1;
    await content.save();
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get content by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const content = await Content.find({ genre: req.params.genre });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;