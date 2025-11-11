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
const app_1 = __importDefault(require("./app"));
const envVars_1 = require("./app/config/envVars");
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isConnected)
            return;
        try {
            if (envVars_1.envVars.DB_URL) {
                yield mongoose_1.default.connect(envVars_1.envVars.DB_URL);
                isConnected = true;
                console.log("✅ MongoDB connected successfully!");
            }
        }
        catch (err) {
            console.error("❌ MongoDB connection error:", err);
        }
    });
}
// For Vercel serverless
if (process.env.VERCEL) {
    connectDB();
    module.exports = app_1.default;
}
else {
    // For local development
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connectDB();
                const port = envVars_1.envVars.PORT || 3000;
                app_1.default.listen(port, () => {
                    console.log(`🚀 Bus Ticket Booking System running on port: ${port}`);
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    main();
}
exports.default = app_1.default;
