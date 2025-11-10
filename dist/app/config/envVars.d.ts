interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production";
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    STRIPE_SECRET_KEY?: string;
    FRONTEND_URL?: string;
}
export declare const envVars: EnvConfig;
export {};
//# sourceMappingURL=envVars.d.ts.map