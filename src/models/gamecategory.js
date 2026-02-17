import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class GameCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GameCategory.hasMany(models.Games,{
        foreignKey:"categoryId",
        as:"games"
      })
    }
  }
  GameCategory.init({
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
    description:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
    

  }, {
    sequelize,
    modelName: 'GameCategory',
    tableName:'gameCategories',
    underscored:true,
  });
  return GameCategory;
};