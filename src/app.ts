import express, { Application, Request, Response } from "express";
const cors = require("cors");
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/auth/auth.route";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();

// middleware
app.use(cookieParser());
// TODO: when deploy frontend, it must be changed
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

// API routes
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes); // /login

app.use("/api/v1", router);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Tour Booking Website Backend 🚀");
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
