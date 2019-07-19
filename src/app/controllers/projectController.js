const Project = require("../models/Project");
const Task = require("../models/Task");

module.exports = {
  async index(req, res) {
    try {
      const projects = await Project.find().populate(["user", "tasks"]);

      return res.send(projects);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ erro: "Error loading projects!" });
    }
  },

  async show(req, res) {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId).populate([
        "user",
        "tasks"
      ]);

      return res.send(project);
    } catch (err) {
      return res.status(400).send({ erro: "Error loading project!" });
    }
  },

  async store(req, res) {
    try {
      const { title, description, tasks } = req.body;

      const project = await Project.create({
        title,
        description,
        user: req.userId
      });

      await Promise.all(
        tasks.map(async task => {
          const projectTask = new Task({ ...task, project: project._id });

          await projectTask.save();
          project.tasks.push(projectTask);
        })
      );

      await project.save();

      return res.send({ project });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: "Error creating new project!" });
    }
  },

  async update(req, res) {
    try {
      const { title, description, tasks } = req.body;

      const project = await Project.findByIdAndUpdate(
        req.params.projectId,
        {
          title,
          description
        },
        { new: true }
      );

      project.tasks = [];
      await Task.deleteOne({ project: project._id });

      await Promise.all(
        tasks.map(async task => {
          const projectTask = new Task({ ...task, project: project._id });

          await projectTask.save();
          project.tasks.push(projectTask);
        })
      );

      await project.save();

      return res.send({ project });
    } catch (err) {
      return res.status(400).send({ error: "Error updating project!" });
    }
  },

  async remove(req, res) {
    const { projectId } = req.params;

    try {
      await Project.findOneAndDelete(projectId);

      return res.send();
    } catch (err) {
      return res.status(400).send({ erro: "Error deleting Project" });
    }
  }
};
