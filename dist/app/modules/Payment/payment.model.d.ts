import mongoose from "mongoose";
import { TPayment } from "./payment.interface";
export declare const PaymentModel: mongoose.Model<TPayment, {}, {}, {}, mongoose.Document<unknown, {}, TPayment, {}, {}> & TPayment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=payment.model.d.ts.map