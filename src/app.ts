import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/auth/auth.route";
import router from "./app/routes";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const app: Application = express();

// middleware
app.use(cors({
  origin: true, // Allow all origins for now
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes); // /login


app.use("/api/v1", router);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Bus Ticket Booking System API is running! 🚌",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check for Vercel
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);
