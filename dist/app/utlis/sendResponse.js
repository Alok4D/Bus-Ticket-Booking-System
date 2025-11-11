"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Standardized response sender
 * @param res Express Response object
 * @param data Response data
 */
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResponse;
