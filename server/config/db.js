import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb+srv://hrfpattern_db_user:Fpattern_2025@cluster0fpattern.q0rmpbo.mongodb.net/fpattern?retryWrites=true&w=majority';;
  
  if (!uri) {
    console.error('❌ MONGO_URI is not set in .env file');
    console.log('Please set MONGO_URI in your .env file');
    console.log('Example: MONGO_URI=mongodb://127.0.0.1:27017/fpattern');
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', true);
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check if MONGO_URI is correct in .env file');
    console.log('2. For MongoDB Atlas: Verify your IP is whitelisted');
    console.log('3. For local MongoDB: Ensure MongoDB is running');
    console.log('4. Check your internet connection');
    process.exit(1);
  }
};