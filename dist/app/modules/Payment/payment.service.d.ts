export declare const PaymentService: {
    createStripeSession(bookingId: string, userEmail: string): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
    verifyPayment(sessionId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./payment.interface").TPayment, {}, {}> & import("./payment.interface").TPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    getUserPayments(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./payment.interface").TPayment, {}, {}> & import("./payment.interface").TPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getPaymentByBooking(bookingId: string): Promise<(import("mongoose").Document<unknown, {}, import("./payment.interface").TPayment, {}, {}> & import("./payment.interface").TPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=payment.service.d.ts.map