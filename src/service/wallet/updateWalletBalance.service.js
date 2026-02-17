import db from "../../models/index.js";
import BaseHandler from "../../utils/baseHandler.js";
import CreateWalletService from "./createWallet.service.js";
import { TRANSACTION_TYPE } from "../../utils/constants.js";

const { Wallet } = db;

export default class UpdateWalletBalanceService extends BaseHandler {
  async run() {
    const { userId, currencyCode, amount, transactionType } = this.args;
    const { transaction } = this.context;

    // get the wallet
    const createWalletService = new CreateWalletService(
      { userId, currencyCode },
      { transaction },
    );

    const walletResult = await createWalletService.run();
    let wallet = walletResult;

    // Calculate the new balance
    const balanceBefore = parseFloat(wallet.balance);
    let balanceAfter;

    if (transactionType == TRANSACTION_TYPE.CREDIT) {
      // add amount
      balanceAfter = balanceBefore + parseFloat(amount);
    } else if (transactionType === TRANSACTION_TYPE.DEBIT) {
      // subtract amount
      balanceAfter = balanceBefore - parseFloat(amount);
      if (balanceAfter < 0) {
        throw new Error("insufficiant balance");
      }
    }

    //updating wallet
    await wallet.update({ balance: balanceAfter }, { transaction });

    return { wallet };
  }
}
