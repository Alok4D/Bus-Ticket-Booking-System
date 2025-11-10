import { Types } from "mongoose";

export interface IAdminLogin {
  email: string;
  password: string;
}

export interface IAdminCreate {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface IDashboardSummary {
  totalUsers: number;
  totalBookings: number;
  totalIncome: number;
  totalBuses: number;
  pendingBookings: number;
  confirmedBookings: number;
  todayBookings: number;
  monthlyRevenue: number;
}

export interface IUserManagement {
  userId: string;
  action: 'block' | 'unblock';
}

export interface ISystemSettings {
  siteName?: string;
  supportEmail?: string;
  supportPhone?: string;
  maintenanceMode?: boolean;
  bookingEnabled?: boolean;
}