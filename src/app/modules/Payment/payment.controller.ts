import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import catchAsync from "../../utlis/catchAsync";
import sendResponse from "../../utlis/sendResponse";

export const PaymentController = {
  createSSLPayment: catchAsync(async (req: Request, res: Response) => {
    const { bookingId, userEmail, userPhone } = req.body;
    const result = await PaymentService.createSSLSession(bookingId, userEmail, userPhone);
    sendResponse(res, { statusCode: 200, success: true, message: "SSL Payment session created", data: result });
  }),

 sslSuccess: catchAsync(async (req: Request, res: Response) => {
  const data = { ...req.body, ...req.query };
  const { tran_id } = data;

  if (tran_id) {
    try {
      // Sandbox mode এ সরাসরি payment success মার্ক করি
      const payment = await PaymentService.handleSSLSuccess(tran_id);
      
      res.send(`
        <html>
          <body style="font-family: Arial; text-align: center; padding: 50px;">
            <h1 style="color: green;">✅ Payment Successful!</h1>
            <p>Transaction ID: ${tran_id}</p>
            <p>Your bus ticket has been confirmed.</p>
            <p>Amount: ${payment?.amount} BDT</p>
            <button onclick="window.close()">Close Window</button>
          </body>
        </html>
      `);
    } catch (error) {
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
  } else {
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
}),


  sslFail: catchAsync(async (req: Request, res: Response) => {
    const { tran_id } = req.body || req.query;
    if (tran_id) await PaymentService.handleSSLFailure(tran_id);
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
  }),

  sslCancel: catchAsync(async (req: Request, res: Response) => {
    const { tran_id } = req.body || req.query;
    if (tran_id) await PaymentService.handleSSLFailure(tran_id);
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
  }),

  sslIPN: catchAsync(async (req: Request, res: Response) => {
    const { tran_id, val_id, status } = req.body;
    if (status === "VALID") await PaymentService.verifySSLPayment(tran_id, val_id);
    else await PaymentService.handleSSLFailure(tran_id);
    res.status(200).send("OK");
  }),

  getUserPayments: catchAsync(async (req: Request, res: Response) => {
    const payments = await PaymentService.getUserPayments(req.params.userId);
    sendResponse(res, { statusCode: 200, success: true, message: "User payments", data: payments });
  }),

  getAllPayments: catchAsync(async (req: Request, res: Response) => {
    const payments = await PaymentService.getAllPayments();
    sendResponse(res, { statusCode: 200, success: true, message: "All payments", data: payments });
  })
};
