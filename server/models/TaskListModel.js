const mongoose = require("mongoose");
const Todo = require("./TodoModel");
const TaskListScheme = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  iconName: String,
  iconColor: String,
  backgroundColor: String,
  todos: Array
});

const TaskList = mongoose.model("Starterlist", TaskListScheme);
module.exports = TaskList;
