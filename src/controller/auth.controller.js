import RegisterService from "../service/auth/register.service.js"
import LoginService from "../service/auth/login.service.js"
import verifyEmailService from "../service/auth/verifyEmail.service.js";
import ForgetPasswordService from "../service/auth/forgetPassword.service.js";
import AllUserService from "../service/auth/allUser.service.js";
import  ResetPasswordService  from "../service/auth/resetPassword.service.js";

class AuthController {
    async register(req,res,next){
        try{
            const service = RegisterService.execute({...req.body},req.context);
            const user = await service.run();
            console.log(`debug======= ${user}==========`);
            res.status(201).json({user,message:"verify your email"})
        }
        catch(err){
            next(err);
        }
    }

    async login(req,res,next){
        try{
            const service =  LoginService.execute(req.body);
            const {token,user} = await service.run();
            res.status(200).json({token,user})
        }
        catch(err){
            next(err);
        }
    }

    async verifyEmail(req,res,next){
        try{
            const service =  verifyEmailService.execute({token:req.params.token},req.context)
            await service.run();
            res.status(200).json({message:"Email verfied"})
        }
        catch(err){
            next(err)
        }
    }

    async forgetPassword(req,res,next){
        try{
            const service =  ForgetPasswordService.execute(req.body,req.context);
            await service.run()
            res.status(200).json({message:"To forget password check your email"})
        }
        catch(err){
            next(err)
        }
    }

    async resetPassword(req,res,next){
        try{
            const service =  ResetPasswordService.execute(req.body,req.context);
            await service.run();
            res.status(200).json({message:"your password has been updated ! "})
        }
        catch(err){
            next(err);
        }
    }

    async getAllUsers(req,res,next){
        try{
        const service = AllUserService.execute(req.query);
        const data = await service.run()
        res.status(200).json({data})
        }
        catch(err){
            next(err)
        }
    }
}

export default new AuthController();