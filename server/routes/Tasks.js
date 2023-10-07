const express = require("express");
const User = require("../models/UserModel");
const tasksRouter = express.Router();

//! GROUPS

//! GET GROUPS
tasksRouter.get("/api/getGroups/:userId", async (req, res) => {
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

//! ADD GROUP
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

//! UPDATE GROUP
tasksRouter.put("/api/updateGroup/:userId/:listId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const listId = req.params.listId;
    const { name, iconName, iconColor, iconType, backgroundColor } = req.body;
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

    if (name) {
      todoList.name = name;
    }
    if (iconName) {
      todoList.iconName = iconName;
    }
    if (iconColor) {
      todoList.iconColor = iconColor;
    }
    if (iconType) {
      todoList.iconType = iconType;
    }
    if (backgroundColor) {
      todoList.backgroundColor = backgroundColor;
    }

    await user.save();
    res.status(200).json(user.listOfTodos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//! TASKS

//! GET ALL TASKS
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
tasksRouter.put("/api/updateTask/:userId/:listId/:taskId", async (req, res) => {
  const userId = req.params.userId;
  const listId = req.params.listId;
  const taskId = req.params.taskId;
  const { todoTitle, todoDesc, isDone } = req.body;
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

    const taskToUpdate = todoList.todos.find(
      (task) => task._id.toString() === taskId
    );
    if (!taskToUpdate) {
      return res.status(404).json({ msg: "Task not found!" });
    }

    if (todoTitle) {
      taskToUpdate.todoTitle = todoTitle;
    }

    if (todoDesc) {
      taskToUpdate.todoDesc = todoDesc;
    }

    if (isDone !== undefined) {
      taskToUpdate.isDone = isDone;
    }

    await user.save();
    res.status(200).json(taskToUpdate);
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

module.exports = tasksRouter;
