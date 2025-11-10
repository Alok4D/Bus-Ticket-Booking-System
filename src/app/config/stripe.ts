import Stripe from "stripe";
import { envVars } from "./envVars";

export const stripe = new Stripe(envVars.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});