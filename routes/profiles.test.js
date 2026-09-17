const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const profilesRouter = require('./profiles');

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api/profiles', profilesRouter);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

describe('Profile Deletion Edge Cases', () => {
  it('should return 400 when attempting to delete the last profile', async () => {
    // 1. Create a user with exactly 1 profile
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      profiles: [{
        name: 'Main Profile',
        avatar: '👤',
        isKids: false
      }]
    });
    await user.save();

    // 2. Generate JWT for auth middleware
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_change_this';
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    const profileId = user.profiles[0]._id;

    // 3. Make delete request
    const response = await request(app)
      .delete(`/api/profiles/${profileId}`)
      .set('Authorization', `Bearer ${token}`);

    // 4. Assert response is 400 and has error message
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Cannot delete last profile' });

    // Verify it wasn't deleted in db
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.profiles.length).toBe(1);
  });
});
