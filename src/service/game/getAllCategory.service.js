import { Utils } from "sequelize";
import db from "../../models/index.js"
import BaseHandler from "../../utils/baseHandler.js";
import CacheUtil from "../../utils/cache.js"
const {GameCategory} = db;

export default class GetAllCategoryService extends BaseHandler{
    async run(){
        console.log("=================>",this.args);

        let {page,size,column,order} = this.args;

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

        // step1 create cache key 
        const cacheKey = `gameCategories:page:${pageNum}:size:${sizeNum}:sortBy:${column}:order:${order}`;

        // step 2 check cache first 
        const cacheData = await CacheUtil.getCache(cacheKey);
        if(cacheData){
            console.log("game category cache hit ");
            return cacheData;
        }
        console.log("game category cache miss ----> db call ");
        
        // step 3 db call 
        const category = await GameCategory.findAll({
            limit:sizeNum,
            offset:(pageNum-1)*sizeNum,
            order:[[column,order]]
        })

        // step 4 storing data in redis cache
                                  // key    data    ttl
        await CacheUtil.setCache(cacheKey,category,600)
        return category;
    }
}

