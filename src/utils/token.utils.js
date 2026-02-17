import jwt from "jsonwebtoken";

export default class TokenUtil {
  //token send on email to verify
  static generateEmailToken(payload) {
    return jwt.sign(payload, process.env.JWT_EMAIL_SECRET, { expiresIn: "5m" });
  }

  //verify that token using the get route
  static verifyEmailToken(token) {
    return jwt.verify(token, process.env.JWT_EMAIL_SECRET);
  }

  // auth token send when login
  static generateAuthToken(payload) {
    return jwt.sign(payload, process.env.JWT_AUTH_SECRET, { expiresIn: "1h" });
  }

  // verify the auth token
  static verifyAuthToken(token) {
    return jwt.verify(token, process.env.JWT_AUTH_SECRET);
  }

  // token send on email to forget password
  static generateForgetPasswordToken(payload) {
    return jwt.sign(payload, process.env.JWT_FORGET_PASSWORD_SECRET, {
      expiresIn: "10m",
    });
  }

  // verify the forget password token
  static verifyForgetPasswordToken(token) {
    if(!token){
        throw new Error("forget Password token required")
    }
    return jwt.verify(token, process.env.JWT_FORGET_PASSWORD_SECRET);
  }
}
