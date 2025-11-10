"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (payload) => {
    console.log(payload);
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    console.log(hashedPassword);
    payload.password = hashedPassword;
    const user = await user_model_1.User.create(payload);
    return user;
};
const getAllUsers = async () => {
    const users = await user_model_1.User.find({});
    const totalUsers = await user_model_1.User.countDocuments();
    return {
        meta: {
            total: totalUsers
        },
        data: users,
    };
};
exports.UserServices = {
    createUser,
    getAllUsers
};
//# sourceMappingURL=user.service.js.map