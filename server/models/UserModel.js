const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true
    },
    email: {
      required: true,
      type: String,
      trim: true
    },
    password: {
      required: true,
      type: String
    },
    image: {
      type: String,
      default: ""
    },
    listOfTodos: {
      type: [
        {
          name: {
            required: true,
            type: String
          },
          iconName: {
            type: String,
            default: "toc"
          },
          iconColor: {
            type: String,
            default: "#5F6189"
          },
          iconType: {
            type: String,
            default: "material"
          },
          backgroundColor: {
            type: String,
            default: "#5D70BD"
          },
          todos: {
            type: [
              {
                todoTitle: String,
                todoDesc: {
                  type: String,
                  default: ""
                },
                isDone: {
                  type: Boolean,
                  default: false
                }
              }
            ],
            default: []
          }
        }
      ],
      default: [
        {
          name: "My Day",
          iconName: "wb-sunny",
          iconColor: "#9CA0A3",
          backgroundColor: "#3C7B82",
          iconType: "material",
          todos: [
            {
              todoTitle: "Learn React Native",
              todoDesc: "3 Hours Of Learning React Native",
              isDone: false
            },
            {
              todoTitle: "Read some Books",
              todoDesc: "1 Hour Of Reading",
              isDone: false
            },
            {
              todoTitle: "WorkOut",
              todoDesc: "go to gym for 1 hour",
              isDone: false
            },
            {
              todoTitle: "Read qura'n",
              todoDesc: "30 mins of reading qura'an",
              isDone: false
            },
            {
              todoTitle: "Learn something new",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          name: "Important",
          iconName: "star-border",
          iconColor: "#8A3655",
          backgroundColor: "#FFE4E9",
          iconType: "material",
          todos: [
            {
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          name: "Planned",
          iconName: "calendar-today",
          iconColor: "#2A655C",
          backgroundColor: "#D6F0F1",
          iconType: "material",
          todos: [
            {
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          name: "Assigned to me",
          iconName: "person",
          iconColor: "#235C47",
          backgroundColor: "#D5F1E5",
          iconType: "material",
          todos: [
            {
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          name: "Flagged emails",
          iconName: "outlined-flag",
          iconColor: "#235C47",
          backgroundColor: "#5D70BD",
          iconType: "material",
          todos: [
            {
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          name: "Tasks",
          iconName: "check-box",
          iconColor: "#5E6585",
          backgroundColor: "#5D70BD",
          iconType: "material",
          todos: [
            {
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          name: "Getting started",
          iconName: "hand-wave-outline",
          iconColor: "#F3B708",
          backgroundColor: "#5D70BD",
          iconType: "material-community",
          todos: [
            {
              todoTitle: "Break this task into smaller steps",
              todoDesc: "0 of 1",
              isDone: true
            },
            {
              todoTitle:
                "Tap all the circles in this list to complete your tasks",
              todoDesc: "",
              isDone: true
            },
            {
              todoTitle:
                "Check out our sample grocery list and customise it for yourself",
              todoDesc: "",
              isDone: true
            },
            {
              todoTitle: "Add #hastags to a task's title to categorise it",
              todoDesc: "",
              isDone: true
            },
            {
              todoTitle: "Open this task's detail view to add it to My Day",
              todoDesc: "",
              isDone: true
            },
            {
              todoTitle: "👉 Select this task to add a reminder and due date",
              todoDesc: "",
              isDone: true
            },
            {
              todoTitle: "Add your first task by clicking on ➕ Add a task",
              todoDesc: "",
              isDone: true
            }
          ]
        },
        {
          name: "Groceries",
          iconName: "cart-variant",
          iconColor: "#235C47",
          backgroundColor: "#EB8060",
          iconType: "material-community",
          todos: [
            {
              todoTitle: "Learn React Native",
              todoDesc: "3 Hours Of Learning React Native",
              isDone: false
            },
            {
              todoTitle: "Read some Books",
              todoDesc: "1 Hour Of Reading",
              isDone: false
            },
            {
              todoTitle: "WorkOut",
              todoDesc: "go to gym for 1 hour",
              isDone: false
            },
            {
              todoTitle: "Read qura'n",
              todoDesc: "30 mins of reading qura'an",
              isDone: false
            },
            {
              todoTitle: "Learn something new",
              todoDesc: "",
              isDone: false
            }
          ]
        }
      ]
    }
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
