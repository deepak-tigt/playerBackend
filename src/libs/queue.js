import { Queue } from "bullmq";
import redis from "./redis.js"

// creating queue with name csv-export 
const csvExportQueue = new Queue("csv-export",{
    connection:redis
}) 

// when job completes , 
csvExportQueue.on("completed",(job)=>{
    console.log(`job ${job.id} - CSV Expost done ! `);  
})

// when a job fails then 
csvExportQueue.on("failed",(job,err)=>{
    console.log(`job ${job.id} - Export failed ! ${err.message}`);
})

export default csvExportQueue;  