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
exports.checkAuth = void 0;
const envVars_1 = require("../config/envVars");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ success: false, message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        console.log("Received token:", token);
        const verifiedToken = jsonwebtoken_1.default.verify(token, envVars_1.envVars.JWT_ACCESS_SECRET);
        console.log("Verified token:", verifiedToken);
        const isUserExist = yield user_model_1.User.findById(verifiedToken.userId);
        console.log("User found:", isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, "Role:", isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role);
        if (!isUserExist) {
            return res
                .status(401)
                .json({ success: false, message: "User does not exist" });
        }
        if (isUserExist.isBlocked) {
            return res
                .status(403)
                .json({ success: false, message: "Account is blocked" });
        }
        console.log("Required roles:", authRoles);
        console.log("User role:", verifiedToken.role);
        if (!authRoles.includes(verifiedToken.role)) {
            return res.status(403).json({
                success: false,
                message: "You are not permitted to access this route",
            });
        }
        req.user = isUserExist;
        next();
    }
    catch (error) {
        console.error("Auth error:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please login again"
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }
        return res
            .status(401)
            .json({ success: false, message: "Authentication failed" });
    }
});
exports.checkAuth = checkAuth;
