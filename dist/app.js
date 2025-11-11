"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const auth_route_1 = require("./app/auth/auth.route");
const routes_1 = __importDefault(require("./app/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// middleware
exports.app.use((0, cors_1.default)({
    origin: true, // Allow all origins for now
    credentials: true
}));
exports.app.use(express_1.default.json({ limit: '10mb' }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// API routes
exports.app.use("/api/v1", user_route_1.UserRoutes);
exports.app.use("/api/v1", auth_route_1.AuthRoutes); // /login
exports.app.use("/api/v1", routes_1.default);
// Health check route
exports.app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bus Ticket Booking System API is running! 🚌",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// Health check for Vercel
exports.app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
// global error handler
exports.app.use(globalErrorHandler_1.default);
// not found handler
exports.app.use(notFound_1.default);
