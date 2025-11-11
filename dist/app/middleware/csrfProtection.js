"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSRFToken = exports.csrfProtection = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Simple CSRF protection middleware
const csrfProtection = (req, res, next) => {
    var _a;
    // Skip CSRF for GET requests and login
    if (req.method === 'GET' || req.path.includes('/login')) {
        return next();
    }
    const token = req.headers['x-csrf-token'];
    const sessionToken = (_a = req.session) === null || _a === void 0 ? void 0 : _a.csrfToken;
    if (!token || !sessionToken || token !== sessionToken) {
        return res.status(403).json({
            success: false,
            message: 'Invalid CSRF token'
        });
    }
    next();
};
exports.csrfProtection = csrfProtection;
// Generate CSRF token
const generateCSRFToken = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.csrfToken)) {
        req.session.csrfToken = crypto_1.default.randomBytes(32).toString('hex');
    }
    res.locals.csrfToken = req.session.csrfToken;
    next();
};
exports.generateCSRFToken = generateCSRFToken;
