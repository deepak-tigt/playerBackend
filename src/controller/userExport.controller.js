import csvExportQueue from "../libs/queue.js";

class UserExportController{
    async exportUserAsCsv(req,res,next){
        try{
            console.log(`User ${req.user.id} requested CSV`);

            // adding the job to the queue so the worker can process it 
            const job = await csvExportQueue.add("export-users",{
                userId :req.user.id,
                email:req.user.email,
                requestedAt : new Date(),
            })
            // console.log(`job ${job.id} added to queue`);

            // respond immediately with the job id (no waiting)
            res.status(202).json({
                success: true,
                message: "CSV export started",
                jobId: job.id,
            })
        }
        catch(error){
            next(error)
        }
    }
}

export default new UserExportController();