'use strict';

import { initProject } from "./Project";
import { initProjectAssignments } from "./ProjectAssignment";
import { initUser } from "./User";

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];
const db: any = {};


let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


const User = initUser(sequelize, Sequelize.DataTypes);
const Project  = initProject(sequelize, Sequelize.DataTypes);
const ProjectAssignments  = initProjectAssignments(sequelize, Sequelize.DataTypes);

User.associate(Project)
Project.associate(User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {
    db,
    User,
    Project,
    ProjectAssignments
} ;

