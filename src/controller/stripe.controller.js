import createCheckoutSession from "../service/stripe/stripe.service.js";

class StripeController {
  async createCheckout(req, res, next) {
    try {
      const session = await createCheckoutSession(req.body);

      res.json({
        success: true,
        paymentLink: session.url,
        sessionId: session.id,
      });
    } 
    catch (error) {
      next(error);
    }
  }

}

export default new StripeController();
