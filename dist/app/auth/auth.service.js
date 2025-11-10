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
    const isUserExist = await user_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new Error("User not found");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new Error("Incorrect Password");
    }
    const jwtPayload = {
        userId: isUserExist?._id,
        email: isUserExist?.email,
        role: isUserExist?.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, envVars_1.envVars.JWT_ACCESS_SECRET, {
        expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES,
    });
    console.log(accessToken);
    return {
        accessToken,
        user: isUserExist
    };
};
exports.AuthServices = {
    credentialsLogin,
};
//# sourceMappingURL=auth.service.js.map