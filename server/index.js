require("dotenv").config();

// IMPORTS FROM PACKAGES
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// IMPORTS FROM OTHER FILES
const basicListRouter = require("./routes/BasicListOfTasks");
const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/Tasks");

// INIT
const PORT = process.env.PORT || 3000;

const dbUrl = process.env.MONGO_URL;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(tasksRouter);
app.use(basicListRouter);

//Connections
mongoose.connect(dbUrl).then(() => {
  console.log("mongodb server started successfully");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
