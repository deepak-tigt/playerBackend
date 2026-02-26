import {Router} from "express"
import passport from "../config/passport.js"
import GoogleAuthConroller from "../controller/googleAuth.controller.js"

const router = Router();

router.get("/google",passport.authenticate("google",{scope: ["profile","email"]}))

router.get("/user/google/callback",passport.authenticate("google",{session:false}),GoogleAuthConroller.googleCallback)

export default router;