const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const { type, genre, search } = req.query;

    // Security: Prevent NoSQL Operator Injection by ensuring query parameters are strings
    if (type && typeof type !== 'string') return res.status(400).json({ message: 'Invalid type parameter' });
    if (genre && typeof genre !== 'string') return res.status(400).json({ message: 'Invalid genre parameter' });
    if (search && typeof search !== 'string') return res.status(400).json({ message: 'Invalid search parameter' });

    let query = {};

    if (type) query.type = type;
    if (genre) query.genre = genre;
    if (search) {
      // Security: Prevent ReDoS by escaping regex special characters
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { title: { $regex: escapedSearch, $options: 'i' } },
        { description: { $regex: escapedSearch, $options: 'i' } }
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