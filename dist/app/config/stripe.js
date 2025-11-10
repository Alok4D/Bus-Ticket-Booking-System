"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const envVars_1 = require("./envVars");
exports.stripe = new stripe_1.default(envVars_1.envVars.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-12-18.acacia",
});
//# sourceMappingURL=stripe.js.map