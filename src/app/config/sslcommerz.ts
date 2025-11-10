const SSLCommerzPayment = require('sslcommerz-lts');
import { envVars } from "./envVars";

// false = sandbox, true = live
export const sslcommerz = new SSLCommerzPayment(
  envVars.STORE_ID,
  envVars.STORE_PASS,
  false
);
