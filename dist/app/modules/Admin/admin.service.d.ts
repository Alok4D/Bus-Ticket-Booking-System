import { IAdminLogin, IAdminCreate, IDashboardSummary, IUserManagement } from "./admin.interface";
export declare const AdminService: {
    login: ({ email, password }: IAdminLogin) => Promise<{
        admin: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone?: string;
            picture?: string;
            address?: string;
            isDeleted?: boolean;
            isActive?: import("../user/user.interface").IsActive;
            isVerified?: boolean;
            isBlocked?: boolean;
            role: import("../user/user.interface").Role;
            refreshToken?: string;
            resetPasswordToken?: string;
            resetPasswordExpiry?: Date;
            __v: number;
        };
        accessToken: string;
    }>;
    createAdmin: ({ name, email, password, phone }: IAdminCreate) => Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        phone?: string;
        picture?: string;
        address?: string;
        isDeleted?: boolean;
        isActive?: import("../user/user.interface").IsActive;
        isVerified?: boolean;
        isBlocked?: boolean;
        role: import("../user/user.interface").Role;
        refreshToken?: string;
        resetPasswordToken?: string;
        resetPasswordExpiry?: Date;
        __v: number;
    }>;
    getDashboardSummary: () => Promise<IDashboardSummary>;
    manageUser: ({ userId, action }: IUserManagement) => Promise<{
        message: string;
    }>;
    getAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("../user/user.interface").IUser, {}, {}> & import("../user/user.interface").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAllBookings: () => Promise<(import("mongoose").Document<unknown, {}, import("../Booking/booking.interface").TBooking, {}, {}> & import("../Booking/booking.interface").TBooking & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getPaymentReports: () => Promise<{
        payments: (import("mongoose").Document<unknown, {}, import("../Payment/payment.interface").IPayment, {}, {}> & import("../Payment/payment.interface").IPayment & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        summary: any[];
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map