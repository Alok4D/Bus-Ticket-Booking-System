"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const envVars_1 = require("../config/envVars");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ success: false, message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        // console.log("token", token);
        const verifiedToken = jsonwebtoken_1.default.verify(token, envVars_1.envVars.JWT_ACCESS_SECRET);
        console.log(verifiedToken);
        const isUserExist = await user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            return res
                .status(401)
                .json({ success: false, message: "User does not exist" });
        }
        if (!authRoles.includes(verifiedToken.role)) {
            return res.status(403).json({
                success: false,
                message: "You are not permitted to view this route",
            });
        }
        req.user = isUserExist;
        console.log(req.user);
        next();
    }
    catch (error) {
        console.error(error);
        return res
            .status(401)
            .json({ success: false, message: "Invalid or expired token" });
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map