"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = require("./user.service");
const createUser = async (req, res, next) => {
    try {
        const user = await user_service_1.UserServices.createUser(req.body);
        res.status(http_status_codes_1.default.CREATED).json({
            success: true,
            message: "User created successfully!",
            data: user,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: error.message || "Failed to create user",
        });
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const result = await user_service_1.UserServices.getAllUsers();
        res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "All Users Retrieved Successfully",
            data: result
        });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || "Failed to get users",
        });
    }
};
exports.UserControllers = {
    createUser,
    getAllUsers
};
