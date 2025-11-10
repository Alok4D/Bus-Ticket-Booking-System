"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "validation failed",
                error: err.error || err.message,
            });
        }
    };
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map