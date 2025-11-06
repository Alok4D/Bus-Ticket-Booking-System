import { Router } from "express";

import { UserRoutes } from "../modules/user/user.route";
import { RouteRoutes } from "../modules/route/route.route";


const router = Router();

const moduleRoutes = [
  {
    path: "/register",
    route: UserRoutes,
  },
  {
    path: '/route',
    route: RouteRoutes
  }



];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
