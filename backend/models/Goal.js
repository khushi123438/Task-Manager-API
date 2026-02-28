const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: String,
  goal: String
});

module.exports = mongoose.model("Goal", goalSchema);