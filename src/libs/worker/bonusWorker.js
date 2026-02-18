import { Worker } from "bullmq";
import connection from "../redis.js"; 
import dailyBonusService from "../../service/bonus/dailyBonus.service.js";

const bonusWorker = new Worker(
    "bonusQueue",
    async (job)=>{
        console.log("bonus worker get th job : ",job.id, job.name);

        if(job.name === "dailyBonusJob"){
            const result = await dailyBonusService.run();
            return {result}
        }
    },
    {
        connection,
        concurrency:1,
    }
)

bonusWorker.on("completed",(job)=>{
    console.log("daily bonus job Completed : ",job.returnvalue);
})

bonusWorker.on("failed",(job,error)=>{
    console.log("daily bonus job failed : ",error);
})

export default bonusWorker;