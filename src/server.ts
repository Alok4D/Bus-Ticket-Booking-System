import app from "./app";
import { envVars } from "./app/config/envVars";
import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  
  try {
    if (envVars.DB_URL) {
      await mongoose.connect(envVars.DB_URL);
      isConnected = true;
      console.log("✅ MongoDB connected successfully!");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

// For Vercel serverless
if (process.env.VERCEL) {
  connectDB();
  module.exports = app;
} else {
  // For local development
  async function main() {
    try {
      await connectDB();
      const port = envVars.PORT || 3000;
      app.listen(port, () => {
        console.log(`🚀 Bus Ticket Booking System running on port: ${port}`);
      });
    } catch (err) {
      console.log(err);
    }
  }
  main();
}

export default app;
