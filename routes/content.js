const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const { type, genre, search } = req.query;
    let query = {};

    if (type) query.type = type;
    if (genre) query.genre = genre;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Performance Optimization: Added .lean() to skip Mongoose document instantiation for read-only operations
    const content = await Content.find(query).sort({ createdAt: -1 }).lean();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get trending content
router.get('/trending', async (req, res) => {
  try {
    // Performance Optimization: Added .lean() to skip Mongoose document instantiation for read-only operations
    const content = await Content.find({ trending: true }).limit(10).lean();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured content
router.get('/featured', async (req, res) => {
  try {
    // Performance Optimization: Added .lean() to skip Mongoose document instantiation for read-only operations
    const content = await Content.findOne({ featured: true }).lean();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    // Performance Optimization: Use atomic update with $inc and .lean() instead of fetch, modify, and save.
    // This reduces database roundtrips and avoids hydrating the Mongoose document.
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get content by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    // Performance Optimization: Added .lean() to skip Mongoose document instantiation for read-only operations
    const content = await Content.find({ genre: req.params.genre }).lean();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;