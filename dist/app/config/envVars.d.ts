interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production";
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    STORE_ID: string;
    STORE_PASS: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
    SSL_IPN_URL: string;
    SSL_SUCCESS_BACKEND_URL: string;
    SSL_FAIL_BACKEND_URL: string;
    SSL_CANCEL_BACKEND_URL: string;
    SSL_SUCCESS_FRONTEND_URL: string;
    SSL_FAIL_FRONTEND_URL: string;
    SSL_CANCEL_FRONTEND_URL: string;
}
export declare const envVars: EnvConfig;
export {};
//# sourceMappingURL=envVars.d.ts.map