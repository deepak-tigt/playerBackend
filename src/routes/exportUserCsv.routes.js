import { Router } from "express";
import UserExportController from "../controller/userExport.controller.js";
import AuthMiddleware from "../middleware/auth.js"

const router = Router();

router.post("/export-csv",AuthMiddleware,UserExportController.exportUserAsCsv)

export default router