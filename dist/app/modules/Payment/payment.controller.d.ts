import { Request, Response } from "express";
export declare const PaymentController: {
    createSSLPayment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    sslSuccess: (req: Request, res: Response, next: import("express").NextFunction) => void;
    sslFail: (req: Request, res: Response, next: import("express").NextFunction) => void;
    sslCancel: (req: Request, res: Response, next: import("express").NextFunction) => void;
    sslIPN: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getUserPayments: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllPayments: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=payment.controller.d.ts.map