import createCheckoutSession from "../service/stripe/stripe.service.js";
import stripeWebhookService from "../service/webhook/stripeWebhook.service.js";

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

  async stripeWebHook(req,res,next){
    try{
      const rawBody = req.rawBody;
      const signature = req.headers["stripe-signature"]
      await stripeWebhookService.handleWebHook({rawBody,signature})
      res.status(200).json({received: true})
    }
    catch(error){
      next(error)
    }
  }
}

export default new StripeController();
