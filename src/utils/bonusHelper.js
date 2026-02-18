import db from "../models/index.js";
import { Op } from "sequelize";

const { User, Bonus, Transaction } = db;

class BonusHelper {
  getCurrentMonthDay() {
    const today = new Date();
    return {
      month: today.getMonth() + 1, // month start from 0
      day: today.getDate(),
      year: today.getFullYear(),
    };
  }

  async getActiveBonus(bonusType) {
    const bonus = await Bonus.findOne({
      where: {
        bonusType,
        status: "active",
      },
    });
    return bonus;
  }

  // get the user by birthdate or createdat date by using the month and day
  async getUserByMonthDay(dateField, month, day) {
    const allUsers = await User.findAll({
      attributes: ["id","firstName","lastName", "email","dateOfBirth", "createdAt"],
    });

    // filtering the users whose date matches with the date and month
    const matchingUsers = allUsers.filter((user) => {
      const dateValue =
        dateField === "dateOfBirth" ? user.dateOfBirth : user.createdAt;

      if (!dateValue) {
        return false;
      }
      const date = new Date(dateValue);
      const userMonth = date.getMonth() + 1;
      const userDay = date.getDate();

      return userMonth === month && userDay === day;
    });

    return matchingUsers;
  }

  async hasReceivedBonusThisYear(userId, purpose, year) {
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31 23:59:59`);

    const existingBonus = await Transaction.findOne({
      where: {
        userId,
        purpose,
        createdAt: {
          [Op.between]: [startOfYear, endOfYear],
        },
      },
    });
    return !!existingBonus;
  }
}


export default new BonusHelper();