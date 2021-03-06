"use strict";

import { Model } from "sequelize";

export interface IProjectAssignment {
  ProjectId: number;
  UserId: string;
}

export function initProjectAssignments(sequelize: any, DataTypes: any) {
  class ProjectAssignment extends Model<IProjectAssignment> implements IProjectAssignment {
    ProjectId!: number;
    UserId!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  ProjectAssignment.init(
    {
      ProjectId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: "ProjectAssignment",
    }
  );
  return ProjectAssignment;
};
