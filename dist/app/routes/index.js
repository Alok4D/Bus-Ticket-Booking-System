"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../auth/auth.route");
const route_route_1 = require("../modules/route/route.route");
const bus_route_1 = require("../modules/Bus/bus.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/route",
        route: route_route_1.RouteRoutes,
    },
    {
        path: "/bus",
        route: bus_route_1.BusRoutes,
    },
    {
        path: "/booking",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map