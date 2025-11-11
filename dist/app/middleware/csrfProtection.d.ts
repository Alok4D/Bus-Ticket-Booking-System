import { Request, Response, NextFunction } from 'express';
export declare const csrfProtection: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const generateCSRFToken: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=csrfProtection.d.ts.map