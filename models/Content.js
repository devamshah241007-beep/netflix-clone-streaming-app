const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: true,
    index: true // ⚡ Bolt: Added index to speed up type-based filtering
  },
  genre: [{
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'],
    index: true // ⚡ Bolt: Added index to speed up genre-based filtering
  }],
  releaseYear: Number,
  rating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA']
  },
  duration: String,
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: String,
  trailerUrl: String,
  cast: [String],
  director: String,
  seasons: [{
    seasonNumber: Number,
    episodes: [{
      episodeNumber: Number,
      title: String,
      description: String,
      duration: String,
      videoUrl: String,
      thumbnailUrl: String
    }]
  }],
  trending: {
    type: Boolean,
    default: false,
    index: true // ⚡ Bolt: Added index to speed up trending queries
  },
  featured: {
    type: Boolean,
    default: false,
    index: true // ⚡ Bolt: Added index to speed up featured queries
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema);