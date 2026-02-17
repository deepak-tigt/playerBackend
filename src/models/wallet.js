import { Model } from "sequelize";
import { STATUS_TYPE, CURRENCY_CODE } from "../utils/constants.js";
export default (sequelize, DataTypes) => {
  class Wallet extends Model {
    
    static associate(models) {
      // multiple wallets can belong to one user
      Wallet.belongsTo(models.User, { foreignKey: "userId", as: "user" });

    }
  }
  Wallet.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      currencyCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: [Object.values(CURRENCY_CODE)],
        },
        field: "currency_code",
      },
      balance: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: Object.values(STATUS_TYPE) },
        defaultValue: STATUS_TYPE.ACTIVE,
      },
    },
    {
      sequelize,
      modelName: "Wallet",
      tableName: "wallets",
      timestamps: true,
      underscored: true,
    },
  );
  return Wallet;
};
