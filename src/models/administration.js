import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Administration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // many admins can belongs to one role 
      Administration.belongsTo(models.Role,{
        foreignKey:"role_id",
        as:"role"
      });

      // self reference for creation 
      Administration.belongsTo(models.Administration,{
        foreignKey:"created_by",
        as:"creator"
      })

    }
  }
  Administration.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
        field:'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
        field:'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: {
          isEmail: true
        },
        set(value) {
            this.setDataValue("email", value.toLowerCase());
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 255],
        },
      },
      permissions: {
        type: DataTypes.JSONB,
        allowNull:false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'role_id'
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'created_by'
      },
  }, {
    sequelize,
    modelName: 'Administration',
    tableName:'administrations',
    underscored:true,
    timestamps:true,
  });
  return Administration;
};