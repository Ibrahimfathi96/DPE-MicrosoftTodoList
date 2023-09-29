const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const tasksRouter = express.Router();
tasksRouter.post("/api/addGroup", async (req, res) => {
  try {
    const { userId, name, backgroundColor } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = {
      // _id: new mongoose.Types.ObjectId(),
      name,
      backgroundColor
    };
    user.listOfTodos.push(todoList);
    await user.save();
    res.json(user.listOfTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
tasksRouter.post("/api/addTask", async (req, res) => {
  try {
    const { userId, todoId, todoTitle, todoDesc } = req.body;
    const user = await User.findById(userId);
    console.log("user:", user);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = await user.listOfTodos.find(
      t => t._id.toString() === todoId
    );
    if (!todoList) {
      return res.status(404).json({ msg: "TodoList not found!" });
    }
    console.log("todoOfUserListOfTodos", user.listOfTodos);
    console.log("todoList:", todoList);
    const todo = {
      _id: new mongoose.Types.ObjectId(),
      todoTitle,
      todoDesc,
      isDone: false
    };
    todoList.todos.push(todo);
    await user.save();
    res.json(todoList.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = tasksRouter;
