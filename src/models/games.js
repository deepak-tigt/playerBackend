import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Games.belongsTo(models.GameCategory,{
        foreignKey:"categoryId",
        as:"category"
      })
    }
  }
  Games.init({
    id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    categoryId:{
      allowNull:false,
      type:DataTypes.INTEGER,
      field:'category_id'
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  }, {
    sequelize,
    modelName: 'Games',
    tableName:'games',
    timestamps:true,
    underscored:true
  });
  return Games;
};