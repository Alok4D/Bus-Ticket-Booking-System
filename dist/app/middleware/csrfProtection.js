"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSRFToken = exports.csrfProtection = void 0;
const crypto_1 = __importDefault(require("crypto"));
const csrfProtection = (req, res, next) => {
    if (req.method === 'GET' || req.path.includes('/login')) {
        return next();
    }
    const token = req.headers['x-csrf-token'];
    const sessionToken = req.session?.csrfToken;
    if (!token || !sessionToken || token !== sessionToken) {
        return res.status(403).json({
            success: false,
            message: 'Invalid CSRF token'
        });
    }
    next();
};
exports.csrfProtection = csrfProtection;
const generateCSRFToken = (req, res, next) => {
    if (!req.session) {
        req.session = {};
    }
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto_1.default.randomBytes(32).toString('hex');
    }
    res.locals.csrfToken = req.session.csrfToken;
    next();
};
exports.generateCSRFToken = generateCSRFToken;
