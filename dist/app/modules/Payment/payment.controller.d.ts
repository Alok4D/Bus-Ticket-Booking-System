import { Request, Response } from "express";
export declare const PaymentController: {
    createCheckoutSession: (req: Request, res: Response, next: import("express").NextFunction) => void;
    verifyPayment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getUserPayments: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getPaymentByBooking: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=payment.controller.d.ts.map