const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  objective: { type: String, required: true },
});

const team = mongoose.model('team', teamSchema);

module.exports = team;
