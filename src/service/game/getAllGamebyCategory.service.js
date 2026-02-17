import db from "../../models/index.js"
import BaseHandler from "../../utils/baseHandler.js";
const {Games , GameCategory} = db;

export default class GetAllGamesByCategoryService extends BaseHandler{

    async run(){
        const {categoryId,data} = this.args
        let {page,size,column,order} = data;

        page = parseInt(page);
        size = parseInt(size);

        let pageNum = 1;
        if(page>0){
            pageNum = page;
        }

        let sizeNum = 10;
        if(size > 0 && size <=100){
            sizeNum = size;
        }

        const gamesBycategory = Games.findAll({
            where:{categoryId:categoryId,status:true},
            include:{model:GameCategory, 
                as:"category",
                attributes:["name"]
            },
            limit:sizeNum,
            offset:(pageNum-1)*sizeNum,
            order:[[column,order]]
        })
        return gamesBycategory;
    }
}
