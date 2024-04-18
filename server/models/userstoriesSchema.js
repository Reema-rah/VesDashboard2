/*const mongoose = require('mongoose');

const userstorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['to-do', 'doing', 'done', 'to-test', 'passed', 'failed'],
    default: 'to-do',
  },
  acceptanceCriteria: {
    type: String,
  },
  assignee: {
    type: String,
  },
  reporter: {
    type: String,
  },
  label: {
    title: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  priority: {
    type: Number,
    min: 1,
    default: 1,
  },
  storyPoints: {
    type: Number,
    min: 1,
    default: 1,
  },
  volunteerToggle: {
    type: Boolean,
    default: false,
  },
  
});

const userstory = mongoose.model('userstory', userstorySchema);

module.exports = userstory;
*/

// models/userStorySchema.js
const mongoose = require('mongoose');

const userStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'Doing', 'Done', 'To Test', 'Failed', 'Passed'], required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  storyPoints: { type: Number, min: 1, max: 8 },
  blocked: { type: Boolean, default: false },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference the 'User' model
  projectID: { type: String },
});

const userStory = mongoose.model('userStory', userStorySchema); // Capitalized model name

module.exports = userStory;


/*
assignee: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }], // Assuming you have a User model
reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true },
*/ 