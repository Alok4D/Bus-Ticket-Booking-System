"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const envVars_1 = require("./app/config/envVars");
const mongoose_1 = __importDefault(require("mongoose"));
async function main() {
    await mongoose_1.default.connect(envVars_1.envVars.DB_URL);
    console.log("✅ MongoDB connected successfully!");
}
main().catch((err) => console.error("❌ MongoDB connection error:", err));
app_1.app.listen(envVars_1.envVars.PORT, () => {
    console.log(`🚀 Server running on port ${envVars_1.envVars.PORT}`);
});
//# sourceMappingURL=server.js.map