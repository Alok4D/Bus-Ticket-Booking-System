import { Router } from "express";

import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../auth/auth.route";
import { RouteRoutes } from "../modules/route/route.route";
import { BusRoutes } from "../modules/Bus/bus.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/route",
    route: RouteRoutes,
  },
  {
    path: "/bus",
    route: BusRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
