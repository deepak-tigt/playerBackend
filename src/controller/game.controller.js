import CreateGameService from "../service/game/createGame.service.js"
import GetAllGameService from "../service/game/getAllGame.service.js"
import GetAllGamebyCategoryService from "../service/game/getAllGamebyCategory.service.js"
class GameController{

    async createGame(req,res,next){
        try{
            const service = CreateGameService.execute(req.body,req.context);
            const game = await service.run()
            res.status(201).json({message:"game is created successfully !",game})
        }
        catch(error){
            next(error)
        }
    }


    // using base
    async getAllGames(req,res,next){
        try{
            const service = GetAllGameService.execute(req.query);
            const games = await service.run()
            res.status(200).json({count:games.length,games})
        }
        catch(error){
            next(error)
        }
    }

    async getAllGameByCategory(req,res,next){
        try{
            const service = GetAllGamebyCategoryService.execute({categoryId:req.params.id,data:req.query})
            const games = await service.run()
            res.status(200).json({count:games.length,games})
        }
        catch(error){
            next(error)
        }
    }
}

export default new GameController();