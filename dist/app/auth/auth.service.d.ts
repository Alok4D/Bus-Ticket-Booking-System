import { IUser } from "../modules/user/user.interface";
export declare const AuthServices: {
    credentialsLogin: (payload: IUser) => Promise<{
        accessToken: string;
        user: import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map