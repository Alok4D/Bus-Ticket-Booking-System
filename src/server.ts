import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import { envVars } from "./app/config/envVars";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("✅ MongoDB connected successfully!");

    const port = envVars.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
}

main();
