import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Cache the connection to reuse across serverless function invocations
let cachedConnection = null;

const connectDB = async () => {
  // Check if MONGODB_URI exists
  if (!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI is not defined in environment variables');
    console.error('❌ CRITICAL ERROR:', error.message);
    throw error;
  }

  // If we have a cached connection and it's ready, reuse it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  // If there's a stale connection, close it
  if (mongoose.connection.readyState !== 0) {
    console.log('⚠️ Closing stale connection...');
    await mongoose.connection.close();
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('URI starts with:', process.env.MONGODB_URI.substring(0, 20) + '...');
    
    // Mongoose connection options optimized for serverless
    const options = {
      bufferCommands: false, // Disable buffering for serverless - critical!
      maxPoolSize: 1, // Reduced for serverless
      minPoolSize: 0,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      connectTimeoutMS: 10000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    cachedConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Full error:', error);
    cachedConnection = null;
    throw error; // Don't exit in serverless, just throw the error
  }
};

export default connectDB;


