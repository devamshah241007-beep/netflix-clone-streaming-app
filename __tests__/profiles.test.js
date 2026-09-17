const request = require('supertest');
const express = require('express');

// Mock dependencies
jest.mock('../middleware/auth', () => {
  return (req, res, next) => {
    req.userId = 'mockUserId123';
    next();
  };
});

const User = require('../models/User');
jest.mock('../models/User');

const profilesRouter = require('../routes/profiles');

const app = express();
app.use(express.json());
app.use('/api/profiles', profilesRouter);

describe('Profiles Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/profiles', () => {
    it('should return 400 if user already has 5 profiles', async () => {
      // Mock User.findById to return a user with 5 profiles
      const mockUser = {
        _id: 'mockUserId123',
        profiles: [
          { name: 'Profile 1' },
          { name: 'Profile 2' },
          { name: 'Profile 3' },
          { name: 'Profile 4' },
          { name: 'Profile 5' }
        ],
        save: jest.fn().mockResolvedValue(true)
      };

      User.findById.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/profiles')
        .send({
          name: 'Profile 6',
          avatar: '👤',
          isKids: false
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Maximum 5 profiles allowed'
      });
      expect(mockUser.save).not.toHaveBeenCalled();
    });

    it('should allow creating a profile if user has less than 5 profiles', async () => {
      const mockUser = {
        _id: 'mockUserId123',
        profiles: [
          { name: 'Profile 1' },
          { name: 'Profile 2' },
          { name: 'Profile 3' },
          { name: 'Profile 4' }
        ],
        save: jest.fn().mockResolvedValue(true)
      };
      // add push functionality
      mockUser.profiles.push = jest.fn((profile) => {
          mockUser.profiles[mockUser.profiles.length] = profile;
      });

      User.findById.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/profiles')
        .send({
          name: 'Profile 5',
          avatar: '👤',
          isKids: false
        });

      expect(response.status).toBe(201);
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockUser.profiles.push).toHaveBeenCalledWith({
          name: 'Profile 5',
          avatar: '👤',
          isKids: false
      });
    });
  });
});
