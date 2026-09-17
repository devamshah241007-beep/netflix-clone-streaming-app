const test = require('node:test');
const assert = require('node:assert');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth');

test('auth middleware', async (t) => {
  await t.test('returns 401 when no token is provided', () => {
    const req = {
      header: (name) => {
        if (name === 'Authorization') return undefined;
      }
    };

    const res = {
      statusCode: 0,
      jsonBody: null,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(body) {
        this.jsonBody = body;
      }
    };

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    authMiddleware(req, res, next);

    assert.strictEqual(res.statusCode, 401);
    assert.deepStrictEqual(res.jsonBody, { message: 'No token, authorization denied' });
    assert.strictEqual(nextCalled, false);
  });

  await t.test('returns 401 when token is invalid', () => {
    const req = {
      header: (name) => {
        if (name === 'Authorization') return 'Bearer invalid_token';
      }
    };

    const res = {
      statusCode: 0,
      jsonBody: null,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(body) {
        this.jsonBody = body;
      }
    };

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    const originalVerify = jwt.verify;
    jwt.verify = () => { throw new Error('Invalid token'); };

    try {
      authMiddleware(req, res, next);
      assert.strictEqual(res.statusCode, 401);
      assert.deepStrictEqual(res.jsonBody, { message: 'Token is not valid' });
      assert.strictEqual(nextCalled, false);
    } finally {
      jwt.verify = originalVerify;
    }
  });

  await t.test('calls next and sets req.userId when token is valid', () => {
    const req = {
      header: (name) => {
        if (name === 'Authorization') return 'Bearer valid_token';
      }
    };

    const res = {
      statusCode: 0,
      jsonBody: null,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(body) {
        this.jsonBody = body;
      }
    };

    let nextCalled = false;
    const next = () => { nextCalled = true; };

    const originalVerify = jwt.verify;
    jwt.verify = (token, secret) => {
      assert.strictEqual(token, 'valid_token');
      return { userId: '12345' };
    };

    try {
      authMiddleware(req, res, next);
      assert.strictEqual(req.userId, '12345');
      assert.strictEqual(nextCalled, true);
    } finally {
      jwt.verify = originalVerify;
    }
  });
});
