import db from "../../models/index.js";
import BaseHandler from "../../utils/baseHandler.js";
const { Games, GameCategory } = db;

export default class CreateGameService extends BaseHandler {
  async run() {
    const data = this.args;
    const { transaction } = this.context;
    // chek for the category
    const category = await GameCategory.findByPk(data.categoryId, {
      transaction,
    });
    if (!category || !category.status) {
      throw new Error("Invalid or inactive category");
    }
    const existingGame = await Games.findOne({
      where: { name: data.name },
      transaction,
    });
    if (existingGame) {
      throw new Error("game already exist !");
    }
    const game = await Games.create(
      {
        name: data.name,
        categoryId: data.categoryId,
        status: data.status,
      },
      { transaction },
    );

    return game;
  }
}
