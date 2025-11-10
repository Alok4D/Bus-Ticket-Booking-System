"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const credentialsLogin = async (req, res, next) => {
    try {
        const loginInfo = await auth_service_1.AuthServices.credentialsLogin(req.body);
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "User logged in successfully!",
            data: {
                accessToken: loginInfo.accessToken,
                user: loginInfo.user,
            },
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.UNAUTHORIZED).json({
            success: false,
            message: error.message || "Login failed",
        });
    }
};
exports.AuthControllers = {
    credentialsLogin,
};
//# sourceMappingURL=auth.controller.js.map