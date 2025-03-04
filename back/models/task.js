const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Todo: { type: [String], required: true },
  In_Progress: { type: [String], required: true },
  Completed: { type: [String], required: true }
});

module.exports = mongoose.model("Task", TaskSchema);
