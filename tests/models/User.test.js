const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

describe('User Model', () => {
  let mongoServer;

  beforeAll(async () => {
    // Increase timeout since downloading MongoDB binaries can take time
    jest.setTimeout(30000);
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('Pre-save hook - Password Hashing', () => {
    it('should hash the password before saving a new user', async () => {
      const plainTextPassword = 'password123';
      const user = new User({
        email: 'test@example.com',
        password: plainTextPassword,
      });

      await user.save();

      expect(user.password).not.toBe(plainTextPassword);

      const isMatch = await bcrypt.compare(plainTextPassword, user.password);
      expect(isMatch).toBe(true);
    });

    it('should not re-hash the password if it has not been modified', async () => {
      const plainTextPassword = 'password123';
      const user = new User({
        email: 'test@example.com',
        password: plainTextPassword,
      });

      await user.save();
      const firstHashedPassword = user.password;

      // Update a different field
      user.subscription = 'premium';
      await user.save();
      const secondHashedPassword = user.password;

      expect(firstHashedPassword).toBe(secondHashedPassword);
    });
  });

  describe('comparePassword method', () => {
    it('should return true for a correct password', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password123',
      });
      await user.save();

      const isMatch = await user.comparePassword('password123');
      expect(isMatch).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password123',
      });
      await user.save();

      const isMatch = await user.comparePassword('wrongpassword');
      expect(isMatch).toBe(false);
    });
  });
});
