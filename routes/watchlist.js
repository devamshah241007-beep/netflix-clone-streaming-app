const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const auth = require('../middleware/auth');

// Get watchlist
router.get('/', auth, async (req, res) => {
  try {
    const { profileId } = req.query;
    let watchlist = await Watchlist.findOne({ 
      userId: req.userId, 
      profileId 
    }).populate('content.contentId continueWatching.contentId');

    if (!watchlist) {
      watchlist = new Watchlist({ userId: req.userId, profileId });
      await watchlist.save();
    }

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to watchlist
router.post('/add', auth, async (req, res) => {
  try {
    const { contentId, profileId } = req.body;
    
    let watchlist = await Watchlist.findOne({ userId: req.userId, profileId });
    
    if (!watchlist) {
      watchlist = new Watchlist({ userId: req.userId, profileId });
    }

    const exists = watchlist.content.some(item => 
      item.contentId.toString() === contentId
    );

    if (!exists) {
      watchlist.content.push({ contentId });
      await watchlist.save();
    }

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from watchlist
router.post('/remove', auth, async (req, res) => {
  try {
    const { contentId, profileId } = req.body;
    
    const watchlist = await Watchlist.findOne({ userId: req.userId, profileId });
    
    if (watchlist) {
      watchlist.content = watchlist.content.filter(item => 
        item.contentId.toString() !== contentId
      );
      await watchlist.save();
    }

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update continue watching
router.post('/continue', auth, async (req, res) => {
  try {
    const { contentId, profileId, progress, seasonNumber, episodeNumber } = req.body;
    
    let watchlist = await Watchlist.findOne({ userId: req.userId, profileId });
    
    if (!watchlist) {
      watchlist = new Watchlist({ userId: req.userId, profileId });
    }

    const existingIndex = watchlist.continueWatching.findIndex(item => 
      item.contentId.toString() === contentId
    );

    if (existingIndex >= 0) {
      watchlist.continueWatching[existingIndex].progress = progress;
      watchlist.continueWatching[existingIndex].lastWatched = new Date();
      if (seasonNumber) watchlist.continueWatching[existingIndex].seasonNumber = seasonNumber;
      if (episodeNumber) watchlist.continueWatching[existingIndex].episodeNumber = episodeNumber;
    } else {
      watchlist.continueWatching.push({
        contentId,
        progress,
        seasonNumber,
        episodeNumber
      });
    }

    await watchlist.save();
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;