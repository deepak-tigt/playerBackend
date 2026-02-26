import BaseHandler from "../../utils/baseHandler.js";
import db from "../../models/index.js"
import TokenUtil from "../../utils/token.utils.js";
import CacheUtil from "../../utils/cache.js";

const {User} = db;

export default class GoogleAuthService extends BaseHandler{
    async run (){
        const {profile} = this.args

        const email = profile.emails[0].value;
        const googleId = profile.id;

        let user = await User.findOne({where:{email}});

        // registering user if not exist 
        if(!user){
            user = await User.create({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName || "GoogleUser",
                email,
                googleId,
                provider: "google",
                password: null,
                isEmailVerified: true,
            })
        }

        // adding goole id with the already exist but not having the google id 
        if(user && !user.googleId){
            user.googleId = googleId,
            user.provider = "google";
            await user.save();
        }

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }

        const token = TokenUtil.generateAuthToken(payload);

        const cacheKey = `auth_token:${user.id}`;

        await CacheUtil.setCache(cacheKey,token,86400);

        return{
            token,user:payload,
        }
    }
}