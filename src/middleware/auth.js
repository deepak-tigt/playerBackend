import jwt from "jsonwebtoken";
import CacheUtil from "../utils/cache.js";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "token Unauthorized" });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);
      // cache key
      const cacheKey = `auth_token:${decode.id}`;
      
      // get the redis token if already stored 
      const redisToken = await CacheUtil.getCache(cacheKey);

      // compare the token with stored token in the redis
      if (!redisToken || redisToken !== token){
        return res.status(401).json({error:" cache deleted for this token  ! "})
      } 
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "token unauthorized" });
    }
  } 
  catch (error) {
    console.log("===========> token error :", error);
    res.status(404).json({ error: "token not found ! " });
  }
};

export default verifyToken;
