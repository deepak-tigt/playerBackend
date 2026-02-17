import { Router } from "express";
import AdministrationController from "../controller/administration.controller.js";
import AuthMiddleware from "../middleware/auth.js";
import CheckPermission from "../middleware/permissionCheck.js";
import administrationController from "../controller/administration.controller.js";
import validateAjv from "../middleware/validateAjv.js";
import administrationSchema from "../schema/administrationSchema.js";
import contextMidlleware from "../middleware/contextMiddleware.js";

const router = Router();

// adding staf
router.post(
  "/administration/registerStaff",
  contextMidlleware(true),
  validateAjv(administrationSchema),
  AuthMiddleware,
  CheckPermission("staff_management", "create"),
  administrationController.addStaff,
);
// staff login
router.post(
  "/administration/login",
  validateAjv(administrationSchema),
  AdministrationController.loginStaff,
);

export default router;
