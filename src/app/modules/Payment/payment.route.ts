import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/ssl-create", PaymentController.createSSLPayment);
router.get("/success", PaymentController.sslSuccess);
router.post("/success", PaymentController.sslSuccess);
router.get("/fail", PaymentController.sslFail);
router.post("/fail", PaymentController.sslFail);
router.get("/cancel", PaymentController.sslCancel);
router.post("/cancel", PaymentController.sslCancel);
router.post("/ssl-ipn", PaymentController.sslIPN);
router.get("/user/:userId", PaymentController.getUserPayments);
router.get("/all", PaymentController.getAllPayments);

export const PaymentRoutes = router;
