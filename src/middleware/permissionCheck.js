

const checkPermission = (category,action)=>{
    return (req,res,next)=>{
        const userPermissions = req.user.permissions;
        console.log(userPermissions);
        

        if(!userPermissions[category]){
            return res.status(403).json({error:"you don't have permission for this category "})
        }

        if(!userPermissions[category].includes(action)){
            return res.status(403).json({error:"you don't have permission for this action "})
        }

        next()
    }
}

export default checkPermission;