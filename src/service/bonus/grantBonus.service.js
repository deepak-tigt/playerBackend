import db from "../../models/index.js";
import BaseHandler from "../../utils/baseHandler.js";
import UpdateWalletBalanceService from "../wallet/updateWalletBalance.service.js";
import CreateTransactionService from "../transaction/createTransaction.service.js"
import { TRANSACTION_TYPE, TRANSACTION_PURPOSE,} from "../../utils/constants.js";

const { User, Bonus, Transaction } = db;

export default class GrantBonusService extends BaseHandler {
  async run() {
    const { userId, bonusType } = this.args;
    const { transaction } = this.context;

    
    // check for user exist
    const user = await User.findOne({ where: { id: userId },transaction });

    if (!user) {
      throw new Error("User not found");
    }

     // Map bonusType to transaction purpose
    const purposeMap = {
      'welcome_bonus': TRANSACTION_PURPOSE.WELCOME_BONUS,
      'birthday_bonus': TRANSACTION_PURPOSE.BIRTHDAY_BONUS,
      'anniversary_bonus': TRANSACTION_PURPOSE.ANNIVERSARY_BONUS
    };

    const transactionPurpose = purposeMap[bonusType];
    if (!transactionPurpose) {
      throw new Error(`Unknown bonus type: ${bonusType}`);
    }

    // check if the bonus is already given 
    const existingBonus = await Transaction.findOne({
      where: {
        userId,
        purpose:transactionPurpose,
      },
      transaction,
    });

    if (existingBonus) {
      throw new Error(`${bonusType} already granted to this user`)
    }

    // check for the previous credit of the birthday

    // get the bonus to give
    const bonus = await Bonus.findOne(
      {
        where: {
          bonusType,
          status: "active",
        },
        transaction },
    );

    if (!bonus) {
      return { message: `${bonusType} bonus not found` };
    }

    // credit the gc amount in wallet
    if (bonus.gcAmount > 0) {
      const gcCredit = new UpdateWalletBalanceService(
        {
          userId,
          currencyCode: "GC",
          amount: bonus.gcAmount,
          transactionType: TRANSACTION_TYPE.CREDIT,
          purpose: transactionPurpose,
          referenceId: `${bonusType}_${bonus.id}`,
        },
        { transaction },
      );
      await gcCredit.run();
    }

    // credit the psc amount in wallet
    if (bonus.scAmount > 0) {
      const pscCredit = new UpdateWalletBalanceService(
        {
          userId,
          currencyCode: "PSC",
          amount: bonus.scAmount,
          transactionType: TRANSACTION_TYPE.CREDIT,
          purpose: transactionPurpose,
          referenceId: `${bonusType}_${bonus.id}`,
        },
        { transaction },
      );
      await pscCredit.run();
    }
    
    // create transaction record 
    const createTransaction = new CreateTransactionService({
      userId,
      transactionType:TRANSACTION_TYPE.CREDIT,
      purpose:transactionPurpose,
      gcAmount:bonus.gcAmount,
      scAmount:bonus.scAmount,
      referenceId:`${bonusType}_${bonus.id}`,
      status:'completed'
    },
    {transaction}) 

    await createTransaction.run();

    return { message: `${bonusType} bonus granted successfully` };
  }
}
