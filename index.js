const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bus Ticket Booking System API is running! 🚌',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes placeholder
app.get('/api/v1/test', (req, res) => {
  res.json({
    success: true,
    message: 'API endpoint working',
    data: null
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL);
      console.log('✅ MongoDB connected');
    }
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
  }
};

connectDB();

const PORT = process.env.PORT || 3000;

// For Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;