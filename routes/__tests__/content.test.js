const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Create a mock Content model
jest.mock('../../models/Content', () => {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn()
  };
});
const Content = require('../../models/Content');

const contentRouter = require('../content');
const app = express();
app.use(express.json());
app.use('/api/content', contentRouter);

describe('Content Router - Security', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should ignore empty parameters', async () => {
    Content.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([])
    });

    await request(app).get('/api/content?type=&genre=');
    expect(Content.find).toHaveBeenCalledWith({});
  });

  it('should escape regex characters in search parameter', async () => {
    Content.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([])
    });

    // Provide a malicious string designed to test ReDoS or regex injection
    const maliciousSearch = '.*+?^${}()|[]\\';
    await request(app).get(`/api/content?search=${encodeURIComponent(maliciousSearch)}`);

    // Check if the characters were escaped properly
    const expectedEscapedSearch = maliciousSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    expect(Content.find).toHaveBeenCalledWith({
      $or: [
        { title: { $regex: expectedEscapedSearch, $options: 'i' } },
        { description: { $regex: expectedEscapedSearch, $options: 'i' } }
      ]
    });
  });

  it('should ignore non-string query parameters (e.g. objects)', async () => {
    Content.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([])
    });

    // passing ?type[$ne]=movie
    await request(app).get('/api/content?type[$ne]=movie&search[$ne]=test');

    // Find should be called with an empty query because non-string parameters are ignored
    expect(Content.find).toHaveBeenCalledWith({});
  });
});
