"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE
    },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER
    },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpiry: { type: Date, select: false },
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)("User", userSchema);
