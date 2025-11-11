module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Root route
    if (req.url === '/' || req.url === '') {
      res.status(200).json({
        success: true,
        message: 'Bus Ticket Booking System API is running! 🚌',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
      });
      return;
    }

    // Health check
    if (req.url === '/health') {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // API test
    if (req.url === '/api/v1/test') {
      res.status(200).json({
        success: true,
        message: 'API endpoint working',
        data: null
      });
      return;
    }

    // 404 for other routes
    res.status(404).json({
      success: false,
      message: 'Route not found',
      path: req.url
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};