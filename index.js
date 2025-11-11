const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bus Ticket Booking System API is running! 🚌',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

// API test endpoint
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API endpoint working',
    data: null
  });
});

// Connect to MongoDB only if DB_URL is provided
const connectDB = async () => {
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL);
      console.log('✅ MongoDB connected');
    } else {
      console.log('⚠️ No DB_URL provided, running without database');
    }
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    // Don't crash the app if DB connection fails
  }
};

// Only connect to DB in production
if (process.env.NODE_ENV === 'production' || process.env.DB_URL) {
  connectDB();
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 3000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;