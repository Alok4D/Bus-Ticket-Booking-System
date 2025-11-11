"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const forgotPassword_service_1 = require("./forgotPassword.service");
const catchAsync_1 = __importDefault(require("../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../utlis/sendResponse"));
const credentialsLogin = (0, catchAsync_1.default)(async (req, res) => {
    const loginInfo = await auth_service_1.AuthServices.credentialsLogin(req.body);
    res.cookie('refreshToken', loginInfo.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User logged in successfully!",
        data: {
            accessToken: loginInfo.accessToken,
            user: loginInfo.user,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Access token refreshed successfully!",
        data: result,
    });
});
const logout = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?._id?.toString();
    await auth_service_1.AuthServices.logout(userId);
    res.clearCookie('refreshToken');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User logged out successfully!",
        data: null,
    });
});
const logoutAll = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?._id?.toString();
    await auth_service_1.AuthServices.logoutAll(userId);
    res.clearCookie('refreshToken');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Logged out from all devices successfully!",
        data: null,
    });
});
const forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.body;
    const result = await forgotPassword_service_1.ForgotPasswordService.forgotPassword(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: result,
    });
});
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const { token, newPassword } = req.body;
    const result = await forgotPassword_service_1.ForgotPasswordService.resetPassword(token, newPassword);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: null,
    });
});
const verifyResetToken = (0, catchAsync_1.default)(async (req, res) => {
    const { token } = req.params;
    const result = await forgotPassword_service_1.ForgotPasswordService.verifyResetToken(token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: { email: result.email },
    });
});
exports.AuthControllers = {
    credentialsLogin,
    refreshToken,
    logout,
    logoutAll,
    forgotPassword,
    resetPassword,
    verifyResetToken,
};
