import TokenUtil from "../../utils/token.utils.js";
import PasswordUtil from "../../utils/password.util.js"
import db from "../../models/index.js"
import BaseHandler from "../../utils/baseHandler.js";
const {User} = db;


export default class ResetPasswordService extends BaseHandler{

    async run(){
        const {token,newPassword,confirmNewPassword,transaction} = this.args;
        console.log(`debug ========> ${token}`);
        
        const decode = TokenUtil.verifyForgetPasswordToken(token)
        if(!decode){
            throw new Error("invalid token !")
        }
        if(newPassword!==confirmNewPassword){
            throw new Error("New Password and Confirm New Password must be same !")
        }
        const user = await User.findOne({where:{email:decode.email},transaction})
        user.password = await PasswordUtil.hash(newPassword);
        await user.save({transaction});

    }
}