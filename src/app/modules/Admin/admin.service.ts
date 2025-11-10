import { User } from "../user/user.model";
import { BusModel } from "../Bus/bus.model";
import { BookingModel } from "../Booking/booking.model";
import { PaymentModel } from "../Payment/payment.model";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { envVars } from "../../config/envVars";
import { IAdminLogin, IAdminCreate, IDashboardSummary, IUserManagement } from "./admin.interface";
import { PAYMENT_STATUS } from "../Payment/payment.interface";

export const AdminService = {
  // Admin Login with better error handling
  login: async ({ email, password }: IAdminLogin) => {
    try {
      const admin = await User.findOne({ email, role: "ADMIN" }).select('+password');
      if (!admin) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password!);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const accessToken = jwt.sign(
        { userId: admin._id, role: admin.role },
        envVars.JWT_ACCESS_SECRET,
        { expiresIn: envVars.JWT_ACCESS_EXPIRES } as SignOptions
      );

      // Remove password from response
      const { password: _, ...adminData } = admin.toObject();
      return { admin: adminData, accessToken };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  },

  // Create Admin
  createAdmin: async ({ name, email, password, phone }: IAdminCreate) => {
    try {
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        throw new Error("Admin with this email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const admin = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: "ADMIN",
      });

      const { password: _, ...adminData } = admin.toObject();
      return adminData;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Admin creation failed");
    }
  },

  // Enhanced Dashboard Summary
  getDashboardSummary: async (): Promise<IDashboardSummary> => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const [totalUsers, totalBookings, totalBuses, pendingBookings, confirmedBookings, todayBookings] = await Promise.all([
        User.countDocuments({ role: "USER" }),
        BookingModel.countDocuments(),
        BusModel.countDocuments(),
        BookingModel.countDocuments({ status: "pending" }),
        BookingModel.countDocuments({ status: "confirmed" }),
        BookingModel.countDocuments({ 
          createdAt: { $gte: today, $lt: tomorrow } 
        })
      ]);

      const [totalIncomeAgg, monthlyRevenueAgg] = await Promise.all([
        PaymentModel.aggregate([
          { $match: { paymentStatus: PAYMENT_STATUS.SUCCESS } },
          { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
        ]),
        PaymentModel.aggregate([
          { 
            $match: { 
              paymentStatus: PAYMENT_STATUS.SUCCESS,
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
    } catch (error) {
      throw new Error("Failed to fetch dashboard summary");
    }
  },

  // User Management
  manageUser: async ({ userId, action }: IUserManagement) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.role === "ADMIN") {
        throw new Error("Cannot manage admin users");
      }

      const isBlocked = action === 'block';
      await User.findByIdAndUpdate(userId, { isBlocked }, { new: true });
      
      return { message: `User ${action}ed successfully` };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "User management failed");
    }
  },

  // Get All Users
  getAllUsers: async () => {
    try {
      return await User.find({ role: "USER" })
        .select('-password')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },

  // Get All Bookings
  getAllBookings: async () => {
    try {
      return await BookingModel.find()
        .populate('user', 'name email')
        .populate('bus', 'busName busNumber')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error("Failed to fetch bookings");
    }
  },

  // Payment Reports
  getPaymentReports: async () => {
    try {
      const payments = await PaymentModel.find()
        .populate('user', 'name email')
        .populate('booking')
        .sort({ createdAt: -1 });

      const summary = await PaymentModel.aggregate([
        {
          $group: {
            _id: "$paymentStatus",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" }
          }
        }
      ]);

      return { payments, summary };
    } catch (error) {
      throw new Error("Failed to fetch payment reports");
    }
  },
};