
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  passcode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userIDs: { type: [String], "default": [] },

});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

