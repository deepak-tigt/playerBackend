import db from "../../models/index.js";
import BaseHandler from "../../utils/baseHandler.js";
import CacheUtil from "../../utils/cache.js"
const { Games, GameCategory } = db;

export default class GetAllGamesService extends BaseHandler {
  async run() {
    console.log("this.args =============>",this.args);
    let {page,size,column,order} = this.args;
    page = parseInt(page);
    size = parseInt(size);

    let pageNum = 1;
    if (page > 0) {
      pageNum = page;
    }

    let sizeNum = 10;
    if (size > 0 && size <= 1000) {
      sizeNum = size;
    }

    // step:1 cache key 
    const cacheKey =  `games:page:${pageNum}:size:${sizeNum}:sortyBy:${column}:order:${order}`;

    // step:2 check for cache data
    const cacheData = await CacheUtil.getCache(cacheKey)
    if(cacheData){
      console.log("game ----------> cache hit ");
      return cacheData;
    }
    console.log("game --->cache miss------->db call");
    
    // step:3 db call 
    const games = await Games.findAll({
      include: { model: GameCategory, 
        as: "category",
        attributes:["name"]
      },
      limit: sizeNum,
      offset: (pageNum - 1) * sizeNum,
      order: [[column, order]],
    });

    // step:4 store the data in cache
    await CacheUtil.setCache(cacheKey,games,300) // expires in 5min 300sec
    return games;
  }
}

