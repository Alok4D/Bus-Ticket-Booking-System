import dotenv from "dotenv";
dotenv.config();

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

const loadEnvVariables = (): EnvConfig => {
  return {
    PORT: process.env.PORT || "3000",
    DB_URL: process.env.DB_URL || "",
    NODE_ENV: (process.env.NODE_ENV as "development" | "production") || "development",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "default-secret",
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "30m",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "default-refresh-secret",
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
    STORE_ID: process.env.STORE_ID || "",
    STORE_PASS: process.env.STORE_PASS || "",
    SSL_PAYMENT_API: process.env.SSL_PAYMENT_API || "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    SSL_VALIDATION_API: process.env.SSL_VALIDATION_API || "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
    SSL_IPN_URL: process.env.SSL_IPN_URL || "",
    SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL || "",
    SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL || "",
    SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL || "",
    SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL || "",
    SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL || "",
    SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL || "",
  };
};

export const envVars = loadEnvVariables();