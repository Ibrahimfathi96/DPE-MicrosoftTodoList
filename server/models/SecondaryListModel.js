const mongoose = require("mongoose");
const secondaryTaskListScheme = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  iconName: String,
  iconColor: String,
  iconType:String,
  backgroundColor: String,
  todos: Array
});

const SecondaryList = mongoose.model("secondarylist", secondaryTaskListScheme);
module.exports = SecondaryList;
