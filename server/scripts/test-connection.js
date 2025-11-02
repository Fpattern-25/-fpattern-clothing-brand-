import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const testConnection = async () => {
  const uri = process.env.MONGO_URI;
  console.log('Testing MongoDB connection...');
  console.log('URI:', uri ? uri.replace(/:[^:@]+@/, ':****@') : 'NOT SET');
  
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', err.message);
    console.error('\nPossible fixes:');
    console.error('1. Check if IP is whitelisted in MongoDB Atlas Network Access');
    console.error('2. Verify username and password are correct');
    console.error('3. Ensure connection string includes database name and parameters');
    console.error('   Format: mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority');
    process.exit(1);
  }
};

testConnection();
