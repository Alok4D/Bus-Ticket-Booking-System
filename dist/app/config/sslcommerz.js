"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sslcommerz = void 0;
const SSLCommerzPayment = require('sslcommerz-lts');
const envVars_1 = require("./envVars");
exports.sslcommerz = new SSLCommerzPayment(envVars_1.envVars.STORE_ID, envVars_1.envVars.STORE_PASS, false);
