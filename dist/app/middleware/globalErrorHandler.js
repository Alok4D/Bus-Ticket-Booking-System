"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong!';
    // ✅ Correct usage of config
    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
    // Handle Mongoose Validation Errors
    let simplifiedError = err;
    if (err.name === 'ValidationError') {
        simplifiedError = Object.values(err.errors)
            .map((el) => el.message)
            .join(', ');
    }
    return res.status(statusCode).json({
        success: false,
        message,
        error: simplifiedError,
        ...(stack && { stack }),
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map