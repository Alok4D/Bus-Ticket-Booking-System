"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true, min: 0 },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, enum: ["stripe", "cash"], default: "stripe" },
    paymentStatus: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
    paymentDate: { type: Date, default: Date.now },
    stripeSessionId: { type: String },
}, { timestamps: true });
exports.PaymentModel = mongoose_1.default.model("Payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map