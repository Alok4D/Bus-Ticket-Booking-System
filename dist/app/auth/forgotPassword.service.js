"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../modules/user/user.model");
exports.ForgotPasswordService = {
    forgotPassword: async (email) => {
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new Error('User not found with this email');
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();
        return {
            message: 'Password reset token sent',
            resetToken,
            resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
        };
    },
    resetPassword: async (token, newPassword) => {
        const user = await user_model_1.User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: new Date() }
        });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        user.refreshToken = undefined;
        await user.save();
        return {
            message: 'Password reset successful'
        };
    },
    verifyResetToken: async (token) => {
        const user = await user_model_1.User.findOne({
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
    }
};
