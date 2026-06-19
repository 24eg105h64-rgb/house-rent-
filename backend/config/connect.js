const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function connectWithRetry(uri, opts = {}, maxRetries = 5) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await mongoose.connect(uri, opts);
      return;
    } catch (err) {
      attempt += 1;
      const delay = Math.min(1000 * 2 ** attempt, 30000);
      console.warn(`MongoDB connection attempt ${attempt} failed: ${err.message}. Retrying in ${delay}ms`);
      await wait(delay);
    }
  }
  throw new Error('Exceeded MongoDB connection retry limit');
}

const connectDB = async () => {
  try {
    const opts = {
      // Mongoose 6+ uses these by default; keep for clarity
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    if (process.env.MONGO_DB) {
      try {
        await connectWithRetry(process.env.MONGO_DB, opts, 5);
        console.log('Connected to MongoDB:', process.env.MONGO_DB);
        return null; // no in-memory server used
      } catch (err) {
        console.warn('Failed to connect to provided MONGO_DB, falling back to in-memory MongoDB:', err.message);
      }
    }

    console.log('Starting in-memory MongoDB');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri, opts);
    console.log('Connected to in-memory MongoDB');
    return mongod;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

module.exports = connectDB;