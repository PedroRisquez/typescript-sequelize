"use strict";

import { Model } from "sequelize";

export interface IProject {
  id?: number;
  title: string;
  status: string;
}
export function initProject(sequelize: any, DataTypes: any) {
  class Project extends Model<IProject> implements IProject {
    id!: number;
    title!: string;
    status!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model: any) {
      Project.belongsToMany(model, {
        through: 'ProjectAssignments',
        as: 'users'
      })
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
