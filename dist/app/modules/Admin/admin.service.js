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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const user_model_1 = require("../user/user.model");
const bus_model_1 = require("../Bus/bus.model");
const booking_model_1 = require("../Booking/booking.model");
const payment_model_1 = require("../Payment/payment.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envVars_1 = require("../../config/envVars");
const payment_interface_1 = require("../Payment/payment.interface");
exports.AdminService = {
    // Admin Login with better error handling
    login: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
        try {
            const admin = yield user_model_1.User.findOne({ email, role: "ADMIN" }).select('+password');
            if (!admin) {
                throw new Error("Invalid credentials");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: admin._id, role: admin.role }, envVars_1.envVars.JWT_ACCESS_SECRET, { expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES });
            // Remove password from response
            const _b = admin.toObject(), { password: _ } = _b, adminData = __rest(_b, ["password"]);
            return { admin: adminData, accessToken };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Login failed");
        }
    }),
    // Create Admin
    createAdmin: (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, phone }) {
        try {
            const existingAdmin = yield user_model_1.User.findOne({ email });
            if (existingAdmin) {
                throw new Error("Admin with this email already exists");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const admin = yield user_model_1.User.create({
                name,
                email,
                password: hashedPassword,
                phone,
                role: "ADMIN",
            });
            const _b = admin.toObject(), { password: _ } = _b, adminData = __rest(_b, ["password"]);
            return adminData;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Admin creation failed");
        }
    }),
    // Enhanced Dashboard Summary
    getDashboardSummary: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const [totalUsers, totalBookings, totalBuses, pendingBookings, confirmedBookings, todayBookings] = yield Promise.all([
                user_model_1.User.countDocuments({ role: "USER" }),
                booking_model_1.BookingModel.countDocuments(),
                bus_model_1.BusModel.countDocuments(),
                booking_model_1.BookingModel.countDocuments({ status: "pending" }),
                booking_model_1.BookingModel.countDocuments({ status: "confirmed" }),
                booking_model_1.BookingModel.countDocuments({
                    createdAt: { $gte: today, $lt: tomorrow }
                })
            ]);
            const [totalIncomeAgg, monthlyRevenueAgg] = yield Promise.all([
                payment_model_1.PaymentModel.aggregate([
                    { $match: { paymentStatus: payment_interface_1.PAYMENT_STATUS.SUCCESS } },
                    { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
                ]),
                payment_model_1.PaymentModel.aggregate([
                    {
                        $match: {
                            paymentStatus: payment_interface_1.PAYMENT_STATUS.SUCCESS,
                            createdAt: { $gte: firstDayOfMonth }
                        }
                    },
                    { $group: { _id: null, monthlyRevenue: { $sum: "$amount" } } },
                ])
            ]);
            const totalIncome = ((_a = totalIncomeAgg[0]) === null || _a === void 0 ? void 0 : _a.totalIncome) || 0;
            const monthlyRevenue = ((_b = monthlyRevenueAgg[0]) === null || _b === void 0 ? void 0 : _b.monthlyRevenue) || 0;
            return {
                totalUsers,
                totalBookings,
                totalIncome,
                totalBuses,
                pendingBookings,
                confirmedBookings,
                todayBookings,
                monthlyRevenue,
            };
        }
        catch (error) {
            throw new Error("Failed to fetch dashboard summary");
        }
    }),
    // User Management
    manageUser: (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, action }) {
        try {
            const user = yield user_model_1.User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role === "ADMIN") {
                throw new Error("Cannot manage admin users");
            }
            const isBlocked = action === 'block';
            yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked }, { new: true });
            return { message: `User ${action}ed successfully` };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "User management failed");
        }
    }),
    // Get All Users
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield user_model_1.User.find({ role: "USER" })
                .select('-password')
                .sort({ createdAt: -1 });
        }
        catch (error) {
            throw new Error("Failed to fetch users");
        }
    }),
    // Get All Bookings
    getAllBookings: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield booking_model_1.BookingModel.find()
                .populate('user', 'name email')
                .populate('bus', 'busName busNumber')
                .sort({ createdAt: -1 });
        }
        catch (error) {
            throw new Error("Failed to fetch bookings");
        }
    }),
    // Payment Reports
    getPaymentReports: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payments = yield payment_model_1.PaymentModel.find()
                .populate('user', 'name email')
                .populate('booking')
                .sort({ createdAt: -1 });
            const summary = yield payment_model_1.PaymentModel.aggregate([
                {
                    $group: {
                        _id: "$paymentStatus",
                        count: { $sum: 1 },
                        totalAmount: { $sum: "$amount" }
                    }
                }
            ]);
            return { payments, summary };
        }
        catch (error) {
            throw new Error("Failed to fetch payment reports");
        }
    }),
};
