
export default function validateAjv(ajvSchema){
    return(req,res,next)=>{
        const valid = ajvSchema(req.body);
        if(!valid){
            const errors = ajvSchema.errors;
            res.status(400).json({message:"Validation failed !",errors})
        }
        next();
    }
}

