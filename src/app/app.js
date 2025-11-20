const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bus Ticket Booking System API is running! 🚌',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API endpoint working',
    data: null
  });
});

app.get('/api/v1/bus', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bus endpoint working',
    data: [
      {
        id: '1',
        busName: 'Green Line',
        busNumber: 'GL-001',
        capacity: 40,
        busType: 'AC'
      },
      {
        id: '2', 
        busName: 'Shyamoli',
        busNumber: 'SH-002',
        capacity: 45,
        busType: 'Non-AC'
      }
    ]
  });
});

// MongoDB connection with global caching
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL);
      isConnected = true;
      console.log('✅ MongoDB connected');
    } else {
      console.log('⚠️ No DB_URL provided, running without database');
    }
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
  }
};

// Connect to DB
if (process.env.NODE_ENV === 'production' || process.env.DB_URL) {
  connectDB();
}

// Error handling
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

module.exports = app;