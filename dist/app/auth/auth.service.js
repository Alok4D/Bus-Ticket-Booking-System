"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const envVars_1 = require("../config/envVars");
const credentialsLogin = async (payload) => {
    const { email, password } = payload;
    const user = await user_model_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid credentials");
    }
    if (user.isBlocked) {
        throw new Error("Account is blocked");
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, envVars_1.envVars.JWT_ACCESS_SECRET, { expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, envVars_1.envVars.JWT_REFRESH_SECRET, { expiresIn: envVars_1.envVars.JWT_REFRESH_EXPIRES });
    user.refreshToken = refreshToken;
    await user.save();
    const { password: _, refreshToken: __, ...userData } = user.toObject();
    return {
        accessToken,
        refreshToken,
        user: userData
    };
};
const refreshToken = async (token) => {
    if (!token) {
        throw new Error("Refresh token required");
    }
    const decoded = jsonwebtoken_1.default.verify(token, envVars_1.envVars.JWT_REFRESH_SECRET);
    const user = await user_model_1.User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
        throw new Error("Invalid refresh token");
    }
    if (user.isBlocked) {
        throw new Error("Account is blocked");
    }
    const newAccessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, envVars_1.envVars.JWT_ACCESS_SECRET, { expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES });
    return { accessToken: newAccessToken };
};
const logout = async (userId) => {
    await user_model_1.User.findByIdAndUpdate(userId, { refreshToken: null });
    return {
        message: "Logout successful"
    };
};
const logoutAll = async (userId) => {
    await user_model_1.User.findByIdAndUpdate(userId, { refreshToken: null });
    return {
        message: "Logged out from all devices"
    };
};
exports.AuthServices = {
    credentialsLogin,
    refreshToken,
    logout,
    logoutAll,
};
