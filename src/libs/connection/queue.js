    import { Queue } from "bullmq";
import redis from "./redis.js"

// creating queue with name csv-export 
export const csvExportQueue = new Queue("csv-export",{
    connection:redis
}) 

export const bonusQueue = new Queue("bonusQueue",{
    connection:redis
})


