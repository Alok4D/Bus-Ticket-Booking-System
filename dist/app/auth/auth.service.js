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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const envVars_1 = require("../config/envVars");
const credentialsLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid credentials");
    }
    if (user.isBlocked) {
        throw new Error("Account is blocked");
    }
    // Generate access token
    const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, envVars_1.envVars.JWT_ACCESS_SECRET, { expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES });
    // Generate refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, envVars_1.envVars.JWT_REFRESH_SECRET, { expiresIn: envVars_1.envVars.JWT_REFRESH_EXPIRES });
    // Save refresh token to database
    user.refreshToken = refreshToken;
    yield user.save();
    // Remove sensitive data from response
    const _a = user.toObject(), { password: _, refreshToken: __ } = _a, userData = __rest(_a, ["password", "refreshToken"]);
    return {
        accessToken,
        refreshToken,
        user: userData
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error("Refresh token required");
    }
    const decoded = jsonwebtoken_1.default.verify(token, envVars_1.envVars.JWT_REFRESH_SECRET);
    const user = yield user_model_1.User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
        throw new Error("Invalid refresh token");
    }
    if (user.isBlocked) {
        throw new Error("Account is blocked");
    }
    // Generate new access token
    const newAccessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, envVars_1.envVars.JWT_ACCESS_SECRET, { expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES });
    return { accessToken: newAccessToken };
});
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear refresh token from database
    yield user_model_1.User.findByIdAndUpdate(userId, { refreshToken: null });
    return {
        message: "Logout successful"
    };
});
const logoutAll = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear all refresh tokens (logout from all devices)
    yield user_model_1.User.findByIdAndUpdate(userId, { refreshToken: null });
    return {
        message: "Logged out from all devices"
    };
});
exports.AuthServices = {
    credentialsLogin,
    refreshToken,
    logout,
    logoutAll,
};
