/**
 * 404 Not Found Middleware
 * This middleware handles all unmatched routes gracefully.
 */
import { Request, Response, NextFunction } from 'express';
declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
export default notFound;
//# sourceMappingURL=notFound.d.ts.map