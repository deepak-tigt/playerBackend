import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.Administration,{
        foreignKey:"role_id",
        as:"administrations"
      })
    }
  }
  Role.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      level:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      permissions:{
        type:DataTypes.JSONB,
        allowNull:false
      },
  }, {
    sequelize,
    modelName: 'Role',
    tableName:'roles',
    timestamps:true,
    underscored:true
  });
  return Role;
};