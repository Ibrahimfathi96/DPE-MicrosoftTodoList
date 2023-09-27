// IMPORTS FROM PACKAGES
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// IMPORTS FROM OTHER FILES
const basicListRouter = require("./routes/BasicListOfTasks");

// INIT
const PORT = 8000;

const dbUrl =
  "mongodb+srv://ibmf796:otJHEbFHXMaieLId@microsoft-to-do-db.44jk0fr.mongodb.net/MicrosoftToDo?retryWrites=true&w=majority";

// MIDDLEWARE
app.use(express.json());
app.use(basicListRouter);

//Connections
mongoose.connect(dbUrl).then(() => {
  console.log("mongodb server started successfully");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
