import CreateCategoryService from "../service/game/createCategory.service.js";
import GetAllCategoryService from "../service/game/getAllCategory.service.js";

class GameCategoryController {
    async createCategory(req,res,next){
        try{
            const service =  CreateCategoryService.execute({data:req.body},req.context);
            const category = await service.run()
            res.status(201).json({message:"game category created successfully",category})
        }
        catch(error){
            next(error)
        }
    }

    async getAllCategory(req,res,next){
        try{
            const service =  GetAllCategoryService.execute(req.query);
            const categories = await service.run()
            res.status(200).json({
                count:categories.length,
                categories
            })
        }
        catch(error){
            next(error)
        }
    }
}


export default new GameCategoryController();