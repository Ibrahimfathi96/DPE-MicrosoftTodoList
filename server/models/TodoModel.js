const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todoId: {
    type: Number
  },
  todoTitle: {
    type: String,
    required: true
  },
  todoDesc: String,
  isDone: {
    type: Boolean,
    required: true
  }
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
