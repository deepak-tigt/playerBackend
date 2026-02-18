import BaseHandler from "../../utils/baseHandler.js";
import bonusHelper from "../../utils/bonusHelper.js";
import {TRANSACTION_PURPOSE, BONUS_TYPE,} from "../../utils/constants.js";
import UpdateWalletBalanceService from "../wallet/updateWalletBalance.service.js";
import GrantBonusService from "./grantBonus.service.js";

class BirthdayBonusService extends BaseHandler {
  async run() {
    // current date
    const { month, day, year } = bonusHelper.getCurrentMonthDay();

    // birthday bonus template
    const bonus = await bonusHelper.getActiveBonus(BONUS_TYPE.BIRTHDAY_BONUS);

    if (!bonus) {
      return { message: "no birthday bonus exist" };
    }

    // get the users whose birthday is today to give bonus
    const users = await bonusHelper.getUserByMonthDay("date_of_birth", month, day);

    
    for (const user of users) {
      const bonusAlreadyGiven = await bonusHelper.hasReceivedBonusThisYear(
        user.id,
        TRANSACTION_PURPOSE.BIRTHDAY_BONUS,
        year,
      );

      if (bonusAlreadyGiven) continue;

      // using the grant bonus service
      const grantBonusService = new GrantBonusService(
        {
            userId:user.id,
            bonusType:BONUS_TYPE.BIRTHDAY_BONUS,
        },
        // {} // empty for checking of the context
      )

      return await grantBonusService.run();
    }
  }
}


export default new BirthdayBonusService();