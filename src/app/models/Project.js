const mongoose = require('../../database');

const ProjectScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', ProjectScheme);

module.exports = Project;
