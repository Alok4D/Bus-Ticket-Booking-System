"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const credentialsLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.AuthServices.credentialsLogin(req.body);
    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', loginInfo.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
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
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Access token refreshed successfully!",
        data: result,
    });
}));
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    yield auth_service_1.AuthServices.logout(userId);
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User logged out successfully!",
        data: null,
    });
}));
const logoutAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString();
    yield auth_service_1.AuthServices.logoutAll(userId);
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Logged out from all devices successfully!",
        data: null,
    });
}));
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield forgotPassword_service_1.ForgotPasswordService.forgotPassword(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: result,
    });
}));
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    const result = yield forgotPassword_service_1.ForgotPasswordService.resetPassword(token, newPassword);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: null,
    });
}));
const verifyResetToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const result = yield forgotPassword_service_1.ForgotPasswordService.verifyResetToken(token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: { email: result.email },
    });
}));
exports.AuthControllers = {
    credentialsLogin,
    refreshToken,
    logout,
    logoutAll,
    forgotPassword,
    resetPassword,
    verifyResetToken,
};
