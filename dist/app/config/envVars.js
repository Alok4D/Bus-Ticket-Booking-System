"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    return {
        PORT: process.env.PORT || "3000",
        DB_URL: process.env.DB_URL || "",
        NODE_ENV: process.env.NODE_ENV || "development",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "default-secret",
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "30m",
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "default-refresh-secret",
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
        STORE_ID: process.env.STORE_ID || "",
        STORE_PASS: process.env.STORE_PASS || "",
        SSL_PAYMENT_API: process.env.SSL_PAYMENT_API || "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
        SSL_VALIDATION_API: process.env.SSL_VALIDATION_API || "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
        SSL_IPN_URL: process.env.SSL_IPN_URL || "",
        SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL || "",
        SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL || "",
        SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL || "",
        SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL || "",
        SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL || "",
        SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL || "",
    };
};
exports.envVars = loadEnvVariables();
