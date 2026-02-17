import PasswordUtil from "../../utils/password.util.js"
import db from "../../models/index.js";
import TokenUtil from "../../utils/token.utils.js";
import BaseHandler from "../../utils/baseHandler.js";
import CacheUtil from "../../utils/cache.js"
const { Administration, Role } = db;

export default class LoginStaffService extends BaseHandler {
  async run() {
    const { email, password } = this.args
    const staff = await Administration.findOne({
      where: { email },
      include: { model: Role, as: "role",
        attributes:['id','name','level','permissions']
      },
    });
    if (!staff) {
      throw new Error("Invalid Email !");
    }

    // check for the password is valid or not 
    const isValidPassword = await PasswordUtil.compare(password,staff.password)
    if(!isValidPassword){
        throw new Error("Invalid password !")
    }


    const payload = {
        id:staff.id,
        firstName:staff.firstName,
        lastName:staff.lastName,
        email:staff.email,
        role:staff.role,
        permissions:staff.role.permissions
        // permissions:staff.permissions 
    }
    const authToken = TokenUtil.generateAuthToken(payload);

    // cache key
    const cacheKey = `auth_token:${staff.id}`;
    
    // storing token in redis 
    const redisToken = await CacheUtil.setCache(cacheKey,authToken,86400);

    return{
        authToken,
        staff:{
            id:staff.id,
            firstName:staff.firstName,
            lastName:staff.lastName,
            email:staff.email,
            roleId:staff.role.id,
            roleName:staff.role.name,
            roleLevel:staff.role.level,
            permissions:staff.role.permissions,
            createdAt:staff.createdAt,
            updatedAt:staff.updatedAt
        }
    }
  }
}

