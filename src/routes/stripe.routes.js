import { Router } from "express";
import stripeController from "../controller/stripe.controller.js";
const router = Router();

router.post("/purchase", stripeController.createCheckout);

router.post("/stripe-webhook",stripeController.stripeWebHook)

router.get("/success", (req, res) => {
  res.redirect("/success.html");
});

router.get("/success", (req, res) => {
  res.redirect("/cancel.html");
});

export default router;
