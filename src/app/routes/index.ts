import { Router } from "express";

import { UserRoutes } from "../modules/user/user.route";
import { RouteRoutes } from "../modules/route/route.route";
import { BusRoutes } from "../modules/Bus/bus.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/register",
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
