import { Model } from 'sequelize';
import { BONUS_TYPE, STATUS_TYPE } from '../utils/constants.js';
export default (sequelize, DataTypes) => {
  class Bonus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bonus.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      bonusType: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{isIn:[Object.values(BONUS_TYPE)]},
        field: 'bonus_type'
      },
      scAmount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0,
        field:'sc_amount'
      },
      gcAmount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0,
        field:'gc_amount'
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATUS_TYPE.ACTIVE,
        validate:{isIn:[Object.values(STATUS_TYPE)]}
      },
      terms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  }, {
    sequelize,
    modelName: 'Bonus',
    tableName: 'bonuses',
    timestamps:true,
    underscored:true,

  });
  return Bonus;
};