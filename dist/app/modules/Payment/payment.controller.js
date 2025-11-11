"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const catchAsync_1 = __importDefault(require("../../utlis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utlis/sendResponse"));
exports.PaymentController = {
    createSSLPayment: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { bookingId, userEmail, userPhone } = req.body;
        const result = yield payment_service_1.PaymentService.createSSLSession(bookingId, userEmail, userPhone);
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "SSL Payment session created", data: result });
    })),
    sslSuccess: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = Object.assign(Object.assign({}, req.body), req.query);
        const { tran_id } = data;
        if (tran_id) {
            try {
                // Sandbox mode এ সরাসরি payment success মার্ক করি
                const payment = yield payment_service_1.PaymentService.handleSSLSuccess(tran_id);
                res.send(`
        <html>
          <body style="font-family: Arial; text-align: center; padding: 50px;">
            <h1 style="color: green;">✅ Payment Successful!</h1>
            <p>Transaction ID: ${tran_id}</p>
            <p>Your bus ticket has been confirmed.</p>
            <p>Amount: ${payment === null || payment === void 0 ? void 0 : payment.amount} BDT</p>
            <button onclick="window.close()">Close Window</button>
          </body>
        </html>
      `);
            }
            catch (error) {
                console.error('Payment processing failed:', error);
                res.send(`
        <html>
          <body style="font-family: Arial; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ Payment Processing Failed!</h1>
            <p>Transaction ID: ${tran_id}</p>
            <p>Error: ${error}</p>
            <button onclick="window.close()">Close Window</button>
          </body>
        </html>
      `);
            }
        }
        else {
            res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1 style="color: red;">❌ Invalid Payment!</h1>
          <p>No transaction ID found</p>
          <button onclick="window.close()">Close Window</button>
        </body>
      </html>
    `);
        }
    })),
    sslFail: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { tran_id } = req.body || req.query;
        if (tran_id)
            yield payment_service_1.PaymentService.handleSSLFailure(tran_id);
        res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1 style="color: red;">❌ Payment Failed!</h1>
          <p>Transaction ID: ${tran_id}</p>
          <p>Please try again or contact support.</p>
          <button onclick="window.close()">Close Window</button>
        </body>
      </html>
    `);
    })),
    sslCancel: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { tran_id } = req.body || req.query;
        if (tran_id)
            yield payment_service_1.PaymentService.handleSSLFailure(tran_id);
        res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1 style="color: orange;">⚠️ Payment Cancelled!</h1>
          <p>Transaction ID: ${tran_id}</p>
          <p>You cancelled the payment process.</p>
          <button onclick="window.close()">Close Window</button>
        </body>
      </html>
    `);
    })),
    sslIPN: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { tran_id, val_id, status } = req.body;
        if (status === "VALID")
            yield payment_service_1.PaymentService.verifySSLPayment(tran_id, val_id);
        else
            yield payment_service_1.PaymentService.handleSSLFailure(tran_id);
        res.status(200).send("OK");
    })),
    getUserPayments: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const payments = yield payment_service_1.PaymentService.getUserPayments(req.params.userId);
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "User payments", data: payments });
    })),
    getAllPayments: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const payments = yield payment_service_1.PaymentService.getAllPayments();
        (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "All payments", data: payments });
    }))
};
