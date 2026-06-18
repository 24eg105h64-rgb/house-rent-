const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    if (process.env.MONGO_DB) {
      try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to MongoDB');
        return;
      } catch (err) {
        console.warn('Failed to connect to provided MONGO_DB, falling back to in-memory MongoDB:', err.message);
      }
    }

    console.log('Starting in-memory MongoDB');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;