import { Types } from "mongoose";
export declare enum PAYMENT_STATUS {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export interface IPayment {
    user: Types.ObjectId;
    booking: Types.ObjectId;
    transactionId: string;
    amount: number;
    paymentMethod: "sslcommerz" | "cash";
    paymentStatus: PAYMENT_STATUS;
    sslSessionId?: string;
    gatewayData?: any;
    paymentDate?: Date;
}
//# sourceMappingURL=payment.interface.d.ts.map