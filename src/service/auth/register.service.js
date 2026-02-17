import db from "../../models/index.js"
const {User} = db;
import PasswordUtil from "../../utils/password.util.js"
import TokenUtil from "../../utils/token.utils.js"
import sendEmailService from "../mail/sendEmail.service.js"
import BaseHandler from "../../utils/baseHandler.js"
import GrantBonusService from "../bonus/grantBonus.service.js";

export default class RegisterService extends BaseHandler {

    async run(){
        const {firstName,lastName,email,password,dateOfBirth} = this.args
        const {transaction} = this.context
        console.log("===============> this.context ===========>",this.context);
        
        const alreadyExists = await User.findOne({where:{email},transaction})
        if(alreadyExists){
            throw new Error("Email already registerd !")
        }
        const hashPassword = await PasswordUtil.hash(password);
        // user created and stored in the user 
        const user = await User.create({firstName,lastName,email,password:hashPassword,dateOfBirth},{transaction})

        const payload ={id:user.id,firstName,lastName,email}
        // token is generated to send on mail 
        const token = TokenUtil.generateEmailToken(payload)
        // mail is send to the user email 
        await sendEmailService.sendVerifyEmail(user.email,token);

        // // grant bonus 
        //     const grantBonus = new GrantBonusService(
        //       {
        //         userId:user.id,
        //         bonusType: 'welcome_bonus'
        //       },
        //       {transaction}
        //     )
        //     await grantBonus.run();

        return {
            user:{
                id:user.id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                dateOfBirth:user.dateOfBirth,
                isEmailVerified:user.isEmailVerified,
                // message: 'Email verified and welcome bonus credited'
            }
    }   }
}

