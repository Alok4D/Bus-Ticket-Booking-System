import { app } from '../src/app';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_URL!);
      console.log('✅ MongoDB connected successfully!');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

// Initialize database connection
connectDB();

// Export the Express app for Vercel
export default app;