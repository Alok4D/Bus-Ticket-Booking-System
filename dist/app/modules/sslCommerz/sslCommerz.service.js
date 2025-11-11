"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSLService = void 0;
const envVars_1 = require("../../config/envVars");
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = require("mongoose");
const sslPaymentInit = async (payload) => {
    try {
        const data = {
            store_id: envVars_1.envVars.STORE_ID,
            store_passwd: envVars_1.envVars.STORE_PASS,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            success_url: `${envVars_1.envVars.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
            fail_url: `${envVars_1.envVars.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
            cancel_url: `${envVars_1.envVars.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
            ipn_url: envVars_1.envVars.SSL_IPN_URL,
            shipping_method: "N/A",
            product_name: "Tour",
            product_category: "Service",
            product_profile: "general",
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: "N/A",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: payload.phoneNumber,
            cus_fax: "01711111111",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: 1000,
            ship_country: "N/A",
        };
        const response = await (0, axios_1.default)({
            method: "POST",
            url: envVars_1.envVars.SSL_PAYMENT_API,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        return response.data;
    }
    catch (error) {
        throw new mongoose_1.Error(`Payment Error: ${error.message}`);
    }
};
const validatePayment = async (payload) => {
    try {
        const response = await (0, axios_1.default)({
            method: "GET",
            url: `${envVars_1.envVars.SSL_VALIDATION_API}?val_id=${payload.val_id}&store_id=${envVars_1.envVars.STORE_ID}&store_passwd=${envVars_1.envVars.STORE_PASS}`
        });
        console.log("sslcomeerz validate api response", response.data);
    }
    catch (error) {
        console.log(error);
        throw new mongoose_1.Error(`Payment Validation Error: ${error.message}`);
    }
};
exports.SSLService = {
    sslPaymentInit,
    validatePayment
};
