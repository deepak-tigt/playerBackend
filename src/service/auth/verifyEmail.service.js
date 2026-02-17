import db from "../../models/index.js";
const { User } = db;
import TokenUtil from "../../utils/token.utils.js";
import BaseHandler from "../../utils/baseHandler.js";
import GrantBonusService from "../bonus/grantBonus.service.js";

export default class VerifyEmailService extends BaseHandler {
  async run() {
    const { token } = this.args;
    const { transaction } = this.context;
    const decode = TokenUtil.verifyEmailToken(token);
    if (!decode) {
      throw new Error("invalid token");
    }
    const user = await User.findByPk(decode.id, { transaction });
    if (!user) {
      throw new Error("user not found");
    }
    if (user.isEmailVerified === true) {
      throw new Error(" Email already verified");
    }
    user.isEmailVerified = true;
    await user.save({ transaction });

    // grant bonus
    const grantBonus = new GrantBonusService(
      {
        userId: user.id,
        bonusType: "welcome_bonus",
      },
      { transaction },
    );
    await grantBonus.run();

    return { message:"email verified and welcome bonus credit "}
  }
}
