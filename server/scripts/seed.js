import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hrfpattern_db_user:Fpattern_2025@cluster0fpattern.q0rmpbo.mongodb.net/fpattern?retryWrites=true&w=majority';

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

const products = [
  { name: 'Oversized Graphic Tee', category: 'tshirt', price: 799, stock: 50, gender: 'unisex', sku: 'FP-T001', description: 'Bold print, 100% cotton', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'], active: true },
  { name: 'Classic White Tee', category: 'tshirt', price: 599, stock: 100, gender: 'unisex', sku: 'FP-T002', description: 'Everyday essential', images: ['https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600'], active: true },
  { name: 'Floral Kurti', category: 'kurti', price: 1299, stock: 30, gender: 'women', sku: 'FP-K001', description: 'Ethnic comfort', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'], active: true },
  { name: 'Denim Jacket', category: 'jacket', price: 2499, stock: 20, gender: 'unisex', sku: 'FP-J001', description: 'Timeless style', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'], active: true },
  { name: 'Striped Polo', category: 'tshirt', price: 899, stock: 40, gender: 'men', sku: 'FP-T003', description: 'Smart casual', images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600'], active: true },
  { name: 'Black Hoodie', category: 'jacket', price: 1799, stock: 35, gender: 'unisex', sku: 'FP-J002', description: 'Cozy streetwear', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600'], active: true },
  { name: 'Printed Kurti Set', category: 'kurti', price: 1599, stock: 25, gender: 'women', sku: 'FP-K002', description: 'Festive ready', images: ['https://images.unsplash.com/photo-1583391733981-5afc8f6c4419?w=600'], active: true },
  { name: 'Vintage Band Tee', category: 'tshirt', price: 999, stock: 60, gender: 'unisex', sku: 'FP-T004', description: 'Retro vibes', images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600'], active: true },
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared products');
    
    await Product.insertMany(products);
    console.log('Seeded products');
    
    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@fpattern.com' });
    if (!adminExists) {
      await User.create({ name: 'Admin', email: 'admin@fpattern.com', password: 'admin123', role: 'admin' });
      console.log('Created admin user: admin@fpattern.com / admin123');
    }else {
      console.log('ℹ️  Admin user already exists');
    }
    
    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
