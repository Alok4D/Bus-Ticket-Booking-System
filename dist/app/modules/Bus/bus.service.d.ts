import { Types } from "mongoose";
import { TBus } from "./bus.interface";
export declare const BusService: {
    createBus: (payload: TBus) => Promise<import("mongoose").Document<unknown, {}, TBus, {}, {}> & TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllBuses: () => Promise<{
        meta: {
            total: number;
        };
        data: (import("mongoose").Document<unknown, {}, TBus, {}, {}> & TBus & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getSingleBus: (id: string) => Promise<import("mongoose").Document<unknown, {}, TBus, {}, {}> & TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateBus: (id: string, payload: Partial<TBus>) => Promise<import("mongoose").Document<unknown, {}, TBus, {}, {}> & TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteBus: (id: string) => Promise<import("mongoose").Document<unknown, {}, TBus, {}, {}> & TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=bus.service.d.ts.map