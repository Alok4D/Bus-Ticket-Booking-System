const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL);
      isConnected = true;
      console.log("✅ MongoDB connected successfully!");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bus Ticket Booking System API is running! 🚌',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API endpoint working',
    data: null
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

// Connect to database
connectDB();

module.exports = app;