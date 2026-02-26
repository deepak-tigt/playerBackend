import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import validateAjv from "../middleware/validateAjv.js";
import userSchema from "../schema/userSchema.js";
import contextMiddleware from "../middleware/contextMiddleware.js";
import AuthMiddleware from "../middleware/auth.js"

const router = Router();

router.post(
  "/user/register",
  validateAjv(userSchema),
  contextMiddleware(true),
  AuthController.register,
);
router.post(
  "/user/login",
  validateAjv(userSchema),
  contextMiddleware(true),
  AuthController.login,
);
router.get("/user/verifyEmail/:token",
    contextMiddleware(true),
     AuthController.verifyEmail);

router.post(
  "/user/forgetPassword",
  validateAjv(userSchema),
  contextMiddleware(true),
  AuthController.forgetPassword,
);
router.post(
  "/user/resetPassword",
  contextMiddleware(true),
  validateAjv(userSchema),
  AuthController.resetPassword,
);

router.get("/users/",AuthMiddleware, AuthController.getAllUsers);

export default router;
