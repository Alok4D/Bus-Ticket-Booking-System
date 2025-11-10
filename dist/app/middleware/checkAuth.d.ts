import { NextFunction, Request, Response } from "express";
export declare const checkAuth: (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=checkAuth.d.ts.map