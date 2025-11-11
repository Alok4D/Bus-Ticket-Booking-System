export declare const ForgotPasswordService: {
    forgotPassword: (email: string) => Promise<{
        message: string;
        resetToken: string;
        resetLink: string;
    }>;
    resetPassword: (token: string, newPassword: string) => Promise<{
        message: string;
    }>;
    verifyResetToken: (token: string) => Promise<{
        message: string;
        email: string;
    }>;
};
//# sourceMappingURL=forgotPassword.service.d.ts.map