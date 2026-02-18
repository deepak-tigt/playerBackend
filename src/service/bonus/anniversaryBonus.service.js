import bonusHelper from "../../utils/bonusHelper.js";
import { BONUS_TYPE } from "../../utils/constants.js";
import UpdateWalletBalanceService from "../wallet/updateWalletBalance.service.js";
import GrantBonusService from "./grantBonus.service.js";

class AnniversaryBonusService {
  async run() {
    // get the current date
    const { month, day, year } = bonusHelper.getCurrentMonthDay();

    // get anniversary bonus
    const bonus = await bonusHelper.getActiveBonus(
      BONUS_TYPE.ANNIVERSARY_BONUS,
    );

    if (!bonus) {
      return;
    }

    // get user having aniversary today
    const users = await bonusHelper.getUserByMonthDay("created_at", month, day);

    for (const user of users) {
      const alreadyGiven = bonusHelper.hasReceivedBonusThisYear(
        user.id,
        BONUS_TYPE.ANNIVERSARY_BONUS,
        year,
      );

      if (alreadyGiven) continue;

      const grantBonusService = new GrantBonusService(
        {
          userId: user.id,
          bonusType: BONUS_TYPE.ANNIVERSARY_BONUS,
        },
        // {} // empty for checking of the context
      );

      return await grantBonusService.run();
    }
  }
}

export default new AnniversaryBonusService();
