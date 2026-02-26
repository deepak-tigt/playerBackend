import GoogleAuthService from "../service/auth/googleLogin.service.js"

class GoogleAuthController {
    async googleCallback(req,res,next){
        try{
            const service = GoogleAuthService.execute({profile:req.user},req.context)
            const result = await service.run();

            res.status(201).json(result)
        }
        catch(error){
            next(error)
        }
    }
}

export default new GoogleAuthController();