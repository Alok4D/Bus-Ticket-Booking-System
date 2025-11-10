import { Types } from "mongoose";
export declare const RouteService: {
    createRoute: (payload: {
        origin: string;
        destination: string;
        distance: number;
    }) => Promise<import("mongoose").Document<unknown, {}, import("./route.interface").IRoute, {}, {}> & import("./route.interface").IRoute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllRoutes: () => Promise<{
        meta: {
            total: number;
        };
        data: (import("mongoose").Document<unknown, {}, import("./route.interface").IRoute, {}, {}> & import("./route.interface").IRoute & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getSingleRoute: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./route.interface").IRoute, {}, {}> & import("./route.interface").IRoute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateRoute: (id: string, payload: Partial<{
        origin: string;
        destination: string;
        distance: number;
    }>) => Promise<import("mongoose").Document<unknown, {}, import("./route.interface").IRoute, {}, {}> & import("./route.interface").IRoute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteRoute: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./route.interface").IRoute, {}, {}> & import("./route.interface").IRoute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=route.service.d.ts.map