import { Model } from "sequelize";
import { CURRENCY_CODE, STATUS_TYPE } from "../utils/constants.js";
export default (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coin.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      currencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isIn: Object.values(CURRENCY_CODE) },
        field:'currency_code'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{isIn:Object.values(STATUS_TYPE)},
        defaultValue: STATUS_TYPE.ACTIVE,
      },
    },
    {
      sequelize,
      modelName: "Coin",
      tableName: "coins",
      timestamps: true,
      underscored: true,
    },
  );
  return Coin;
};
