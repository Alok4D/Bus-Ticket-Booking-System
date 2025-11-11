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
exports.ForgotPasswordService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../modules/user/user.model");
exports.ForgotPasswordService = {
    // Send reset token
    forgotPassword: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error('User not found with this email');
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Save reset token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        yield user.save();
        return {
            message: 'Password reset token sent',
            resetToken, // Remove this in production
            resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
        };
    }),
    // Reset password with token
    resetPassword: (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: new Date() }
        });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }
        // Hash new password
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
        // Update password and clear reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        if (user) {
            user.refreshToken = undefined; // Logout from all devices
        }
        yield user.save();
        return {
            message: 'Password reset successful'
        };
    }),
    // Verify reset token
    verifyResetToken: (token) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: new Date() }
        });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }
        return {
            message: 'Token is valid',
            email: user.email
        };
    })
};
