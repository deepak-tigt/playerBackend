import TokenUtil from "../../utils/token.utils.js";
import sendEmailService from "../mail/sendEmail.service.js";
import db from "../../models/index.js"
import BaseHandler from "../../utils/baseHandler.js";
const {User} = db;


export default class ForgetPasswordService extends BaseHandler{
    async run(){
        const {email} = this.args
        const {transaction} = this.context
        console.log(email , "debug 2")
        const user = await User.findOne({
            where : {email},
            transaction
        })
        
        if(!user){
            throw new Error("user not exists with this email !")
        }
        const payload = {id:user.id,email:user.email}
        const token =  TokenUtil.generateForgetPasswordToken(payload)
        console.log(token,user.email);
        
        await sendEmailService.sendForgetPasswordEmail(user.email,token)
    }

}
