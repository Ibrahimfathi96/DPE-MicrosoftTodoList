const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const tasksRouter = express.Router();

//! ADD GROUP OF TASKLISTS
tasksRouter.post("/api/addGroup/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const { name } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = {
      name
    };
    user.listOfTodos.push(todoList);
    await user.save();
    res.status(200).json(user.listOfTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//! ADD TASK
tasksRouter.post("/api/addTask", async (req, res) => {
  try {
    const { userId, todoId, todoTitle, todoDesc } = req.body;
    const user = await User.findById(userId);
    console.log("user:", user);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = await user.listOfTodos.find(
      (t) => t._id.toString() === todoId
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

//! UPDATE TASK
// TODO: UPDATE TASK NOT TESTED YET
tasksRouter.put("/api/updateTask", async (req, res) => {
  try {
    const { userId, todoId, todoTitle, todoDesc } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = await user.listOfTodos.find(
      (t) => t._id.toString() === todoId
    );
    if (!todoList) {
      return res.status(404).json({ msg: "TodoList not found!" });
    }
    const todo = todoList.todos.find((t) => t._id.toString() === todoId);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found!" });
    }
    todo.todoTitle = todoTitle;
    todo.todoDesc = todoDesc;
    await user.save();
    res.json(todoList.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//! DELETE TASK
// TODO: DELETE TASK NOT TESTED YET
tasksRouter.delete("/api/deleteTask", async (req, res) => {
  try {
    const { userId, todoId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = await user.listOfTodos.find(
      (t) => t._id.toString() === todoId
    );
    if (!todoList) {
      return res.status(404).json({ msg: "TodoList not found!" });
    }
    const todoIndex = todoList.todos.findIndex(
      (t) => t._id.toString() === todoId
    );
    if (todoIndex === -1) {
      return res.status(404).json({ msg: "Todo not found!" });
    }
    todoList.todos.splice(todoIndex, 1);
    await user.save();
    res.json(todoList.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//! GET ALL TASKS
// TODO: GET ALL TASKS NOT TESTED YET
tasksRouter.get("/api/getTasks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    res.json(user.listOfTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = tasksRouter;
