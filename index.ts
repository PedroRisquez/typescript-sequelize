import express, { Request, Response } from "express";

const app = express();

const port = process.env.PORT || 3000;

import { User, Project, db, ProjectAssignments } from "./models";
import { IUser } from "./models/User";
import { users } from "./seeders/users";
import { projects } from "./seeders/projects";
import { projectassigments } from "./seeders/projectassigments";
import { IProject } from "./models/Project";
import { IProjectAssignment } from "./models/ProjectAssignment";

const createUsers = async () => {
  await Promise.all(
    users.map(async (user: IUser) => {
      await User.create(user);
    })
  );
};
const createProjects = async () => {
  await Promise.all(
    projects.map(async (project: IProject) => {
      await Project.create(project);
    })
  );
};
const createProjectsAssignments = async () => {
  await Promise.all(
    projectassigments.map(async (projectassigment: IProjectAssignment) => {
      await ProjectAssignments.create(projectassigment);
    })
  );
};


db.sequelize.sync().then(async () => {
  // await createUsers();
  // await createProjects();
  // await createProjectsAssignments();
  
  app.get('/users', async (req: Request, res: Response): Promise<Response> => {
    const users: IUser[] = await User.findAll({
      include: {
        model: Project,
        as: 'projects'
      }
    })
    return res.json(users)
  });

  app.get('/projects', async (req: Request, res: Response): Promise<Response> => {
    const projects: IProject[] = await Project.findAll({
      include: {
        model: User,

        as: 'users'
      }
    })
    return res.json(projects)
  });

  app.get('/projects/:id', async (req: Request, res: Response): Promise<Response> => {
    const project : IProject |  any = await Project.findByPk(req.params.id);
    const users = await project.getUsers();
    return res.json(users)
  });

  app.get('/users/:id', async (req: Request, res: Response): Promise<Response> => {
    const user : IUser | any = await User.findByPk(req.params.id);
    const projects = await user.getProjects({ joinTableAttributes: [] });
    return res.json(projects)
  });

  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
});
