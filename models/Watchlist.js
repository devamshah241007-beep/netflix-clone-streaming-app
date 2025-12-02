const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profileId: String,
  content: [{
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  continueWatching: [{
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    progress: {
      type: Number,
      default: 0
    },
    lastWatched: {
      type: Date,
      default: Date.now
    },
    seasonNumber: Number,
    episodeNumber: Number
  }]
});

module.exports = mongoose.model('Watchlist', watchlistSchema);