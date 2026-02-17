import db from "../../models/index.js"
import BaseHandler from "../../utils/baseHandler.js";
const {GameCategory} = db;


export default class CreateCategoryService extends BaseHandler{
    async run(){
        const {data} = this.args;
        const {transaction}  = this.context
        const existing = await GameCategory.findOne({
            where:{name:data.name}
        })

        if(existing){
            throw new Error("category already exits");
        }
        const category = GameCategory.create({
            name:data.name,
            description:data.description,
            status:data.status,
        },{transaction})

        return category;
    }
}
    