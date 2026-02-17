import db from "../../models/index.js"
import PasswordUtil from "../../utils/password.util.js";
import PermissionUtil from "../../utils/permission.util.js"
const {Administration,Role} = db;
import BaseHandler from "../../utils/baseHandler.js"

export default class AddStaffService extends BaseHandler {

     async run(){
        let {creatorId,data} = this.args 
        console.log("======",creatorId,data,"=========");
         
        const {transaction} = this.context   
        console.log("===================>",creatorId,data);
        
        const creator = await Administration.findByPk(creatorId,{
            include:{model:Role,as:"role"},
            transaction
        });

        if(!creator){
            throw new Error("Creator not found")
        }

        // target role 
        const role = await Role.findByPk(data.roleId,{transaction})
        if(!role){
            throw new Error("Role not found !")
        }

        // compare hierarchy 
        if(creator.role.level >= role.level){
            throw new Error("you are not eligible to perform this action !")
        }

        // now check the permission 
        if(!PermissionUtil.isSubset(data.permissions,creator.role.permissions)){
            throw new Error("can't exceed creator's permissions")
        }

        // check if existing staff
        const existingStaff = await Administration.findOne({where:{email:data.email},transaction})
        if(existingStaff){
            throw new Error("email already registered")
        }
        
        // password hash 
        const hashedPassword = await PasswordUtil.hash(data.password)

        // adding the staff
        const newStaff = await Administration.create({
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            password:hashedPassword,
            permissions:data.permissions,
            roleId:data.roleId,
            createdBy:creatorId
        },{transaction})

        // take the password out of the sequelize object and put all the remaing in the staffData from the new staff
        const {password,...staffData} = newStaff.toJSON()
        return staffData;
    }
}   

