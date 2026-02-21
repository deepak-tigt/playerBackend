import cron from "node-cron"

import { bonusQueue } from "../connection/queue.js"

export default function startCron(){
    

    // birthday bonus cron -> runs every day at : 
    cron.schedule("* * * * *",async()=>{
        try{
            console.log("enqueuing bonus");
            await bonusQueue.add("dailyBonusJob",{})
            console.log(" bonus job added to the queue");
        }
        catch(error){
            console.log("birthday cron error : ",error);
        }
    })
}