const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Mock Auth middleware
jest.mock('../../middleware/auth', () => {
  return (req, res, next) => {
    req.userId = 'mockUserId';
    next();
  };
});

// Mock Watchlist model
jest.mock('../../models/Watchlist', () => {
  const Watchlist = function(data) {
    Object.assign(this, data);
  };
  Watchlist.findOne = jest.fn();
  Watchlist.prototype.save = jest.fn();
  return Watchlist;
});

const Watchlist = require('../../models/Watchlist');
const watchlistRouter = require('../watchlist');
const app = express();
app.use(express.json());
app.use('/api/watchlist', watchlistRouter);

describe('Watchlist Router - Security', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject non-string profileId', async () => {
    const res = await request(app).get('/api/watchlist?profileId[$ne]=testProfile');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid profileId parameter');
  });

  it('should accept valid string profileId', async () => {
    const mockPopulate = jest.fn().mockResolvedValue({
      userId: 'mockUserId',
      profileId: 'testProfile',
      content: [],
      continueWatching: []
    });
    Watchlist.findOne.mockReturnValue({
      populate: mockPopulate
    });

    const res = await request(app).get('/api/watchlist?profileId=testProfile');
    expect(res.status).toBe(200);
    expect(Watchlist.findOne).toHaveBeenCalledWith({
      userId: 'mockUserId',
      profileId: 'testProfile'
    });
  });

  it('should allow getting watchlist without profileId', async () => {
    const mockPopulate = jest.fn().mockResolvedValue({
      userId: 'mockUserId',
      content: [],
      continueWatching: []
    });
    Watchlist.findOne.mockReturnValue({
      populate: mockPopulate
    });

    const res = await request(app).get('/api/watchlist');
    expect(res.status).toBe(200);
    expect(Watchlist.findOne).toHaveBeenCalledWith({
      userId: 'mockUserId'
    });
  });
});
