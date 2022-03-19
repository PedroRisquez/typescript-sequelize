"use strict";

import { Model, UUIDV4 } from "sequelize";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export function initUser(sequelize: any, DataTypes: any) {
  class User extends Model<IUser> implements IUser {
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model: any) {
      User.belongsToMany(model,{
        through: 'ProjectAssignments',
        as: 'projects'
      })
    }
  }
  User.init(
    {
      id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,

      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: {msg: 'Must be a valid Email'}
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
