import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/envVars";

async function main() {
  await mongoose.connect(envVars.DB_URL);
  console.log("✅ MongoDB connected successfully!");
}

main().catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(envVars.PORT, () => {
  console.log(`🚀 Server running on port ${envVars.PORT}`);
});
