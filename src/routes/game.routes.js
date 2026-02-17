import { Router } from "express";
import GameController from "../controller/game.controller.js";
import AuthMiddleware from "../middleware/auth.js";
import CheckPermission from "../middleware/permissionCheck.js";
import validateAjv from "../middleware/validateAjv.js";
import gameSchema from "../schema/gameSchema.js";
import contextMiddleware from "../middleware/contextMiddleware.js";
const router = Router();


// create game
router.post(
  "/game/addGame",
  validateAjv(gameSchema),
  AuthMiddleware,
  CheckPermission("game_management", "create"),
  contextMiddleware(true),
  GameController.createGame,
);

//get all games
router.get(
  "/game/getAllGame",
  AuthMiddleware,
  CheckPermission("game_management", "read"),
  GameController.getAllGames,
);

// get all games by category
router.get(
  "/game/getAllGameByCategory/:id",
  AuthMiddleware,
  CheckPermission("game_management", "read"),
  GameController.getAllGameByCategory,
);

export default router;
