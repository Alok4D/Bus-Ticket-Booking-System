import { Types } from "mongoose";
export declare const BusService: {
    createBus: (payload: any) => Promise<import("mongoose").Document<unknown, {}, import("./bus.interface").TBus, {}, {}> & import("./bus.interface").TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllBuses: () => Promise<{
        meta: {
            total: number;
        };
        data: (import("mongoose").Document<unknown, {}, import("./bus.interface").TBus, {}, {}> & import("./bus.interface").TBus & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getSingleBus: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./bus.interface").TBus, {}, {}> & import("./bus.interface").TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateBus: (id: string, payload: Partial<any>) => Promise<import("mongoose").Document<unknown, {}, import("./bus.interface").TBus, {}, {}> & import("./bus.interface").TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteBus: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./bus.interface").TBus, {}, {}> & import("./bus.interface").TBus & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=bus.service.d.ts.map