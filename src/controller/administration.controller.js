import AddStaffService from "../service/administration/addStaff.service.js";
import LoginStaffService from "../service/administration/loginStaff.service.js"


class AdministrationController{
    
    async addStaff(req,res,next) {
        try{
            
            console.log("-------------->",req.user);
            
            const service =  AddStaffService.execute({creatorId:req.user.id,data:req.body},req.context);
            const result = await service.run();
            res.status(201).json({staff:result,message:"staff created sucessfully !"})
        }
        catch(error){
            next(error);
        }
    }

    async loginStaff(req,res,next) {
        try {
        const service =  LoginStaffService.execute(req.body)
        const result = await service.run();
        
        res.status(200).json(result)
        } 
        catch (error) {
        next(error)
        }
    }

    
}


export default new AdministrationController();