"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const payment_interface_1 = require("./payment.interface");
const paymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose_1.Schema.Types.ObjectId, ref: "Booking", required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["sslcommerz", "cash"], default: "sslcommerz" },
    paymentStatus: { type: String, enum: Object.values(payment_interface_1.PAYMENT_STATUS), default: payment_interface_1.PAYMENT_STATUS.PENDING },
    sslSessionId: { type: String },
    gatewayData: { type: mongoose_1.Schema.Types.Mixed },
    paymentDate: { type: Date, default: Date.now },
}, { timestamps: true, versionKey: false });
exports.PaymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
