const request = require('supertest');
const express = require('express');
const contentRoutes = require('./content');
const Content = require('../models/Content');

jest.mock('../models/Content');

const app = express();
app.use(express.json());
app.use('/api/content', contentRoutes);

describe('Content Routes Security', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/content', () => {
    it('should handle NoSQL injection attempts via objects gracefully', async () => {
      Content.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([])
      });

      const response = await request(app)
        .get('/api/content')
        .query({ type: { $ne: 'movie' }, genre: { $regex: 'action' }, search: { $gt: '' } });

      expect(response.status).toBe(200);

      // The query object passed to find should be empty because non-string inputs are ignored
      expect(Content.find).toHaveBeenCalledWith({});
    });

    it('should escape special regex characters in search query to prevent ReDoS', async () => {
      Content.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([])
      });

      const searchString = '.*+?^${}()|[]\\';
      const expectedEscaped = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';

      const response = await request(app)
        .get('/api/content')
        .query({ search: searchString });

      expect(response.status).toBe(200);

      // The query object passed to find should have the escaped search string
      expect(Content.find).toHaveBeenCalledWith({
        $or: [
          { title: { $regex: expectedEscaped, $options: 'i' } },
          { description: { $regex: expectedEscaped, $options: 'i' } }
        ]
      });
    });

    it('should process valid string inputs correctly', async () => {
      Content.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([])
      });

      const response = await request(app)
        .get('/api/content')
        .query({ type: 'movie', genre: 'action', search: 'batman' });

      expect(response.status).toBe(200);

      expect(Content.find).toHaveBeenCalledWith({
        type: 'movie',
        genre: 'action',
        $or: [
          { title: { $regex: 'batman', $options: 'i' } },
          { description: { $regex: 'batman', $options: 'i' } }
        ]
      });
    });
  });
});
