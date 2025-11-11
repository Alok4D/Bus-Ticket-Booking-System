export declare const PaymentService: {
    createSSLSession(bookingId: string, userEmail: string, userPhone: string): Promise<{
        paymentUrl: any;
        sessionId: string;
    }>;
    verifySSLPayment(tran_id: string, val_id: string): Promise<import("mongoose").Document<unknown, {}, import("./payment.interface").IPayment, {}, {}> & import("./payment.interface").IPayment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    handleSSLSuccess(tran_id: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./payment.interface").IPayment, {}, {}> & import("./payment.interface").IPayment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, never>>;
    handleSSLFailure(tran_id: string): Promise<(import("mongoose").Document<unknown, {}, import("./payment.interface").IPayment, {}, {}> & import("./payment.interface").IPayment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getUserPayments(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./payment.interface").IPayment, {}, {}> & import("./payment.interface").IPayment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getAllPayments(): Promise<(import("mongoose").Document<unknown, {}, import("./payment.interface").IPayment, {}, {}> & import("./payment.interface").IPayment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=payment.service.d.ts.map