interface ILoginData {
    email: string;
    password: string;
}
export declare const AuthServices: {
    credentialsLogin: (payload: ILoginData) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone?: string;
            picture?: string;
            address?: string;
            isDeleted?: boolean;
            isActive?: import("../modules/user/user.interface").IsActive;
            isVerified?: boolean;
            isBlocked?: boolean;
            role: import("../modules/user/user.interface").Role;
            resetPasswordToken?: string;
            resetPasswordExpiry?: Date;
            __v: number;
        };
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
    logout: (userId: string) => Promise<{
        message: string;
    }>;
    logoutAll: (userId: string) => Promise<{
        message: string;
    }>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map