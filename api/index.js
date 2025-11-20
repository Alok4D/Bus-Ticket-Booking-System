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
    timestamp: new Date().toISOString()
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

// Bus Schema (exact match with your database)
const busSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  busNumber: { type: String, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  fare: { type: Number, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true }
}, { timestamps: true });

// Use exact collection name from your database
const Bus = mongoose.model('Bus', busSchema, 'buses');

// Bus endpoint - fetch from database with route population
app.get('/api/v1/bus', async (req, res) => {
  try {
    await connectDB();
    
    const buses = await Bus.find({}).populate('route');
    
    res.status(200).json({
      success: true,
      message: 'Buses retrieved',
      data: {
        meta: {
          total: buses.length
        },
        data: buses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching buses',
      error: error.message
    });
  }
});

// Create bus endpoint
app.post('/api/v1/bus', async (req, res) => {
  try {
    await connectDB();
    
    const { busName, busNumber, capacity, busType, amenities } = req.body;
    
    const newBus = new Bus({
      busName,
      busNumber,
      capacity,
      busType,
      amenities
    });
    
    const savedBus = await newBus.save();
    
    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: savedBus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating bus',
      error: error.message
    });
  }
});

// Route Schema (exact match with your database)
const routeSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true }
}, { timestamps: true });

// Use exact collection name from your database
const Route = mongoose.model('Route', routeSchema, 'routes');

// Routes endpoint
app.get('/api/v1/route', async (req, res) => {
  try {
    await connectDB();
    
    const routes = await Route.find({});
    
    res.status(200).json({
      success: true,
      message: 'Routes retrieved successfully',
      data: {
        meta: {
          total: routes.length
        },
        data: routes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching routes',
      error: error.message
    });
  }
});

// Create route endpoint
app.post('/api/v1/route', async (req, res) => {
  try {
    await connectDB();
    
    const { origin, destination, distance } = req.body;
    
    const newRoute = new Route({
      origin,
      destination,
      distance
    });
    
    const savedRoute = await newRoute.save();
    
    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      data: savedRoute
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating route',
      error: error.message
    });
  }
});

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return Promise.resolve();
  
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      isConnected = true;
      console.log('✅ MongoDB connected');
    } else {
      throw new Error('DB_URL not found in environment variables');
    }
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    throw error;
  }
};

// Test DB connection endpoint
app.get('/api/v1/db-test', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: 'Database connected successfully',
      dbUrl: process.env.DB_URL ? 'Set' : 'Not Set'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      dbUrl: process.env.DB_URL ? 'Set' : 'Not Set'
    });
  }
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