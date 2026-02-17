import redis from "../libs/redis.js";

class CacheUtil {
  //return the cached data if exist
  async getCache(key) {
    try {
      // Function to GET data from cache
      const data = await redis.get(key);
      if (data) {
        return JSON.parse(data);
      } else return null;
    } catch (error) {
      console.log("cache get error : ", error);
    }
  }

  // to store the data with its ttl in cache
  async setCache(key, data, ttl = 600) {
    try {
      // set the cache with data and its key with its expiry
      await redis.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.log("cache set error : ", error);
    }
  }

  // to delete the data from cache
  async deleteCache(key) {
    try {
      // remove the data form the redis using key
      await redis.del(key);
    } catch (error) {
      console.log("cache delete error : ", error);
    }
  }
}

export default new CacheUtil();