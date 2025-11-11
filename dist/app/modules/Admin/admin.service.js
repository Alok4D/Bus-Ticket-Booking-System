"use strict";
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
    login: async ({ email, password }) => {
        try {
            const admin = await user_model_1.User.findOne({ email, role: "ADMIN" }).select('+password');
            if (!admin) {
                throw new Error("Invalid credentials");
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }
            const accessToken = jsonwebtoken_1.default.sign({ userId: admin._id, role: admin.role }, envVars_1.envVars.JWT_ACCESS_SECRET, { expiresIn: envVars_1.envVars.JWT_ACCESS_EXPIRES });
            const { password: _, ...adminData } = admin.toObject();
            return { admin: adminData, accessToken };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Login failed");
        }
    },
    createAdmin: async ({ name, email, password, phone }) => {
        try {
            const existingAdmin = await user_model_1.User.findOne({ email });
            if (existingAdmin) {
                throw new Error("Admin with this email already exists");
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 12);
            const admin = await user_model_1.User.create({
                name,
                email,
                password: hashedPassword,
                phone,
                role: "ADMIN",
            });
            const { password: _, ...adminData } = admin.toObject();
            return adminData;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Admin creation failed");
        }
    },
    getDashboardSummary: async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const [totalUsers, totalBookings, totalBuses, pendingBookings, confirmedBookings, todayBookings] = await Promise.all([
                user_model_1.User.countDocuments({ role: "USER" }),
                booking_model_1.BookingModel.countDocuments(),
                bus_model_1.BusModel.countDocuments(),
                booking_model_1.BookingModel.countDocuments({ status: "pending" }),
                booking_model_1.BookingModel.countDocuments({ status: "confirmed" }),
                booking_model_1.BookingModel.countDocuments({
                    createdAt: { $gte: today, $lt: tomorrow }
                })
            ]);
            const [totalIncomeAgg, monthlyRevenueAgg] = await Promise.all([
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
            const totalIncome = totalIncomeAgg[0]?.totalIncome || 0;
            const monthlyRevenue = monthlyRevenueAgg[0]?.monthlyRevenue || 0;
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
    },
    manageUser: async ({ userId, action }) => {
        try {
            const user = await user_model_1.User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            if (user.role === "ADMIN") {
                throw new Error("Cannot manage admin users");
            }
            const isBlocked = action === 'block';
            await user_model_1.User.findByIdAndUpdate(userId, { isBlocked }, { new: true });
            return { message: `User ${action}ed successfully` };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "User management failed");
        }
    },
    getAllUsers: async () => {
        try {
            return await user_model_1.User.find({ role: "USER" })
                .select('-password')
                .sort({ createdAt: -1 });
        }
        catch (error) {
            throw new Error("Failed to fetch users");
        }
    },
    getAllBookings: async () => {
        try {
            return await booking_model_1.BookingModel.find()
                .populate('user', 'name email')
                .populate('bus', 'busName busNumber')
                .sort({ createdAt: -1 });
        }
        catch (error) {
            throw new Error("Failed to fetch bookings");
        }
    },
    getPaymentReports: async () => {
        try {
            const payments = await payment_model_1.PaymentModel.find()
                .populate('user', 'name email')
                .populate('booking')
                .sort({ createdAt: -1 });
            const summary = await payment_model_1.PaymentModel.aggregate([
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
    },
};
