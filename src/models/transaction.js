import { Model } from "sequelize";
import {
  TRANSACTION_TYPE,
  TRANSACTION_STATUS_TYPE,
  TRANSACTION_PURPOSE,
} from "../utils/constants.js";
export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // one transaction can have one user
      Transaction.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Transaction.init(
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
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.values(TRANSACTION_TYPE)],
        },
        field: "transaction_type",
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.values(TRANSACTION_PURPOSE)],
        },
      },
      gcAmount:{
        type:DataTypes.DECIMAL(18,2),
        allowNull:false,
        field:'gc_amount',
        defaultValue:0
      },
      scAmount:{
        type:DataTypes.DECIMAL(18,2),
        allowNull:false,
        field:'sc_amount',
        defaultValue:0
      },
      referenceId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "reference_id",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: TRANSACTION_STATUS_TYPE.COMPLETED,
        validate: {
          isIn: [Object.values(TRANSACTION_STATUS_TYPE)],
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      timestamps: true,
      underscored: true,
    },
  );
  return Transaction;
};
