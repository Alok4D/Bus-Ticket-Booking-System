import { Response } from "express";
type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T | null;
};
/**
 * Standardized response sender
 * @param res Express Response object
 * @param data Response data
 */
declare const sendResponse: <T>(res: Response, data: TResponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map