const express = require("express");
const basicListRouter = express.Router();
const TaskList = require("../models/TaskListModel");
const SecondaryList = require("../models/SecondaryListModel");
//! GET STARTER LIST OF TASKS
basicListRouter.get("/api/getStarterList", async (req, res) => {
  try {
    const listOfTasks = await TaskList.find({}, { __v: false });
    res.json(listOfTasks);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

//! GET Secondary LIST OF TASKS
basicListRouter.get("/api/getSecondaryList", async (req, res) => {
  try {
    const listOfTasks = await SecondaryList.find({}, { __v: false });
    res.json(listOfTasks);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});
module.exports = basicListRouter;
