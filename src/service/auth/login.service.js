import PasswordUtil from "../../utils/password.util.js";
import db from "../../models/index.js";
const { User } = db;
import TokenUtil from "../../utils/token.utils.js";
import sendEmailService from "../mail/sendEmail.service.js";
import BaseHandler from "../../utils/baseHandler.js";
import CacheUtil from "../../utils/cache.js";
import GrantBonusService from "../bonus/grantBonus.service.js";


export default class LoginService extends BaseHandler {
  async run() {
    const { email, password } = this.args;
    const {transaction} = this.context
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid email !");
    }
    const valid = await PasswordUtil.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password !");
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    if (!user.isEmailVerified) {
      // token is generated to send an mail
      const token = TokenUtil.generateEmailToken(payload);
      // mail is send to the user email
      await sendEmailService.sendVerifyEmail(user.email, token);
      throw new Error("Email Not Verified check your gmail to verify");
    }
    const authToken = TokenUtil.generateAuthToken(payload);

    // cache key
    const cacheKey = `auth_token:${user.id}`;

    // storing token in redis 
    const existingToken = await CacheUtil.setCache(cacheKey,authToken,86400);

    return {
      token: authToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }
}
