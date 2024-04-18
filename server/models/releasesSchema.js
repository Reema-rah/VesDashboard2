/*const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  iterations: Number,
  status: String
});

const release = mongoose.model('release', releaseSchema);

module.exports = release;*/


// models/releaseSchema.js
const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  objective: { type: String, required: true },
  iterations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'iteration' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  released: { type: Boolean, default: false },
  projectID: { type: String },
});

const release = mongoose.model('release', releaseSchema);

module.exports = release;
