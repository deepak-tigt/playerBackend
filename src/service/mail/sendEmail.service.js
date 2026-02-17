import nodemailer from "nodemailer";

class MailService{
    constructor(){
        this.trasporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });
    }

    sendVerifyEmail(email,token){
        const link = `http://localhost:8080/api/v1/user/verifyEmail/${token}`
        return this.trasporter.sendMail({
            to:email,
            subject:"verify your email",
            html:`<a href="${link}">verify Email</a>`
        })
    }

    sendForgetPasswordEmail(email,token){
        console.log(email ,"debug");
        
        return this.trasporter.sendMail({
            to:email,
            subject:"forget password token",
            html:`<p>${token}</p>`
        })
    }
}

export default new MailService();