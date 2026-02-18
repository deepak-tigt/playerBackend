import { Worker } from "bullmq";
import redis from "../redis.js";
import ExportUsersCsvService from "../../service/auth/exportUsersCsv.service.js";

// create a worker for  csv-export  queue (it pick the job from the queue)
const csvExportWorker = new Worker("csv-export", async(job)=>{
    try{
        console.log(`worker pick the job : ${job.id}`);
        console.log(`user ${job.data.userId} requested export`);

        const service = new ExportUsersCsvService();

        const result = await service.run();

        console.log(`job ${job.id} completed`);

        // bullmq will store this
        return result;
    }
    catch(err){
        console.log(`job ${job.id} failed:${err.message}`);
        throw err
    }
},{
    connection:redis,
})

// listen for the event 
 csvExportWorker.on("completed",(job)=>{
    console.log(`worker finished job ${job.id}`);
})

csvExportWorker.on("failed",(job,err)=>{
    console.log(`worker failed on job ${job.id} : ${err.message}`);
})


export default csvExportWorker;