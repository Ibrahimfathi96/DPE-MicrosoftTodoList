const { v4: uuidv4 } = require("uuid");
const express = require("express");
const User = require("../models/UserModel");
const tasksRouter = express.Router();
tasksRouter.post("/api/addTodo", async (req, res) => {
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

module.exports = tasksRouter;
