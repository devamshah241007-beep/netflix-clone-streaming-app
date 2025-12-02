const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all profiles
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create profile
router.post('/', auth, async (req, res) => {
  try {
    const { name, avatar, isKids } = req.body;
    const user = await User.findById(req.userId);
    
    if (user.profiles.length >= 5) {
      return res.status(400).json({ message: 'Maximum 5 profiles allowed' });
    }

    user.profiles.push({ name, avatar: avatar || '👤', isKids: isKids || false });
    await user.save();

    res.status(201).json(user.profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update profile
router.put('/:profileId', auth, async (req, res) => {
  try {
    const { name, avatar, isKids } = req.body;
    const user = await User.findById(req.userId);
    
    const profile = user.profiles.id(req.params.profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (name) profile.name = name;
    if (avatar) profile.avatar = avatar;
    if (isKids !== undefined) profile.isKids = isKids;

    await user.save();
    res.json(user.profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete profile
router.delete('/:profileId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (user.profiles.length <= 1) {
      return res.status(400).json({ message: 'Cannot delete last profile' });
    }

    user.profiles.pull(req.params.profileId);
    await user.save();

    res.json(user.profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;