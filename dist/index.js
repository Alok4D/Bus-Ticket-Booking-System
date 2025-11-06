"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const course_routes_1 = require("./app/models/course/course.routes");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// middleware
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
//Routes
exports.app.get("/api/courses", (req, res) => {
    res.send({
        message: "Testing..",
    });
});
exports.app.use("api/courses", course_routes_1.courseRoutes);
exports.app.use("/api/users", course_routes_1.courseRoutes);
exports.app.use("/api/metors", course_routes_1.courseRoutes);
// test route
exports.app.get("/", (req, res) => {
    res.send(" 🚀");
});
// start server
exports.app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map