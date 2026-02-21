import Redis from "ioredis";

// redis connection instance 
 // This connects to the Redis server running in Docker
const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost", 
    port: process.env.REDIS_PORT || 6379,
     maxRetriesPerRequest: null,

     
})

export default redis;