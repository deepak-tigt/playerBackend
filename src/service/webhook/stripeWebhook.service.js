import {
  TRANSACTION_PURPOSE,
  TRANSACTION_STATUS_TYPE,
  TRANSACTION_TYPE
} from "../../utils/constants.js";
import stripe from "../../libs/connection/stripe.js";
import UpdateWalletBalanceService from "../wallet/updateWalletBalance.service.js";
import CreateTransactionService from "../transaction/createTransaction.service.js";

class StripeWebHookService {
  async handleWebHook({ rawBody, signature }) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.log("webhook signature verification failed !", error.message);
      throw new Error("webhook error : ", error.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;
      const scAmount = session.metadata.scAmount;
      const gcAmount = session.metadata.gcAmount;

      // wallet update for gcAmount
      if (gcAmount > 0) {
        const gcCredit = new UpdateWalletBalanceService({
          userId,
          currencyCode: "GC",
          amount: gcAmount,
          transactionType: TRANSACTION_TYPE.CREDIT,
          purpose: TRANSACTION_PURPOSE.PURCHASE,
        });
        await gcCredit.run();
      }

      // wallet update for sc amount
      if (scAmount > 0) {
        const scCredit = new UpdateWalletBalanceService({
          userId,
          currencyCode: "PSC",
          amount: scAmount,
          transactionType: TRANSACTION_TYPE.CREDIT,
          purpose: TRANSACTION_PURPOSE.PURCHASE,
        });
        await scCredit.run();
      }

      // creating transaction for the wallet updates
      const createTransaction = new CreateTransactionService({
        userId,
        transactionType: TRANSACTION_TYPE.CREDIT,
        purpose: TRANSACTION_PURPOSE.PURCHASE,
        gcAmount: gcAmount,
        scAmount: scAmount,
        status: TRANSACTION_STATUS_TYPE.COMPLETED,
      });
      await createTransaction.run();
    } else if (event.type === "checkout.session.expired") {
        console.log("checkout session expired !!");
    }
  }
}

export default new StripeWebHookService();