"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const user_route_1 = require("./app/modules/user/user.route");
const auth_route_1 = require("./app/auth/auth.route");
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// middleware
app.use((0, cookie_parser_1.default)());
// TODO: when deploy frontend, it must be changed
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express_1.default.json());
// API routes
app.use("/api/v1", user_route_1.UserRoutes);
app.use("/api/v1", auth_route_1.AuthRoutes); // /login
app.use("/api/v1", routes_1.default);
// test route
app.get("/", (req, res) => {
    res.send("Tour Booking Website Backend 🚀");
});
// global error handler
app.use(globalErrorHandler_1.default);
// not found handler
app.use(notFound_1.default);
exports.default = app;
