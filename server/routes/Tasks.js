const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const tasksRouter = express.Router();

//! ADD GROUP OF TASKLISTS
tasksRouter.post("/api/addGroup/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const { name, iconName, iconColor, iconType, backgroundColor } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const todoList = {
      name,
      iconName,
      iconColor,
      iconType,
      backgroundColor
    };
    user.listOfTodos.push(todoList);
    await user.save();
    res.status(200).json(user.listOfTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//! ADD TASK
tasksRouter.post("/api/addTask/:userId/:listId", async (req, res) => {
  const userId = req.params.userId;
  const listId = req.params.listId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const todoList = user.listOfTodos.find(
      (list) => list._id.toString() === listId
    );
    if (!todoList) {
      return res.status(404).json({ msg: "List not found!" });
    }

    const { todoTitle, todoDesc } = req.body;
    const newTodo = {
      todoTitle,
      todoDesc
    };

    todoList.todos.push(newTodo);

    await user.save();

    res.status(200).json(todoList.todos);
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

tasksRouter.get("/api/getTaskLists/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    res.json(user.listOfTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

tasksRouter.get("/api/getTasks/:userId/:listId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const listId = req.params.listId;
    console.log("userId:", userId + "\nlistId:" + listId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const todoList = user.listOfTodos.find(
      (list) => list._id.toString() === listId
    );
    if (!todoList) {
      return res.status(404).json({ msg: "List not found!" });
    }
    res.status(200).json(todoList.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = tasksRouter;
