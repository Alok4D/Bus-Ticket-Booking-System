import { NextFunction, Request, Response } from "express";
export declare const AuthControllers: {
    credentialsLogin: (req: Request, res: Response, next: NextFunction) => void;
    refreshToken: (req: Request, res: Response, next: NextFunction) => void;
    logout: (req: Request, res: Response, next: NextFunction) => void;
    logoutAll: (req: Request, res: Response, next: NextFunction) => void;
    forgotPassword: (req: Request, res: Response, next: NextFunction) => void;
    resetPassword: (req: Request, res: Response, next: NextFunction) => void;
    verifyResetToken: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=auth.controller.d.ts.map