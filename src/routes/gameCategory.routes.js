import { Router } from "express";
import GameCategoryController from "../controller/gameCategory.controller.js";
import AuthMiddleware from "../middleware/auth.js";
import CheckPermission from "../middleware/permissionCheck.js";
import contextMiddleware from "../middleware/contextMiddleware.js";

const router = Router();

// add category
router.post(
  "/gameCategory/addGameCategory",
  AuthMiddleware,
  CheckPermission("game_management", "create"),
  contextMiddleware(true),
  GameCategoryController.createCategory,
);

// get all category
router.get(
  "/gameCategory/getAllCategory",
  AuthMiddleware,
  CheckPermission("game_management", "read"),
  GameCategoryController.getAllCategory,
);

export default router;
