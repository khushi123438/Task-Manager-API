const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: String,
  content: String
});

module.exports = mongoose.model("Note", noteSchema);