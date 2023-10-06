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
                _id: {
                  type: String,
                  default: mongoose.Types.ObjectId
                },
                todoTitle: {
                  type: String,
                  default: "Default Task"
                },
                todoDesc: {
                  type: String,
                  default: "Default description"
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
          _id: "65146cb7b0307aaab2cef4e1",
          name: "My Day",
          iconName: "wb-sunny",
          iconColor: "#9CA0A3",
          backgroundColor: "#3C7B82",
          iconType: "material",
          todos: [
            {
              _id: "0",
              todoTitle: "Learn React Native",
              todoDesc: "3 Hours Of Learning React Native",
              isDone: false
            },
            {
              _id: "1",
              todoTitle: "Read some Books",
              todoDesc: "1 Hour Of Reading",
              isDone: false
            },
            {
              _id: "2",
              todoTitle: "WorkOut",
              todoDesc: "go to gym for 1 hour",
              isDone: false
            },
            {
              _id: "3",
              todoTitle: "Read qura'n",
              todoDesc: "30 mins of reading qura'an",
              isDone: false
            },
            {
              _id: "4",
              todoTitle: "Learn something new",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          _id: "65146ce0b0307aaab2cf88cb",
          name: "Important",
          iconName: "star-border",
          iconColor: "#8A3655",
          backgroundColor: "#FFE4E9",
          iconType: "material",
          todos: [
            {
              _id: "0",
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          _id: "65146cf9b0307aaab2cfe622",
          name: "Planned",
          iconName: "calendar-today",
          iconColor: "#2A655C",
          backgroundColor: "#D6F0F1",
          iconType: "material",
          todos: [
            {
              _id: "0",
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          _id: "65146d11b0307aaab2d03c26",
          name: "Assigned to me",
          iconName: "person",
          iconColor: "#235C47",
          backgroundColor: "#D5F1E5",
          iconType: "material",
          todos: [
            {
              _id: "0",
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          _id: "65146d2db0307aaab2d0c6c7",
          name: "Flagged emails",
          iconName: "outlined-flag",
          iconColor: "#235C47",
          backgroundColor: "#5D70BD",
          iconType: "material",
          todos: [
            {
              _id: "0",
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          _id: "65146d40b0307aaab2d109ab",
          name: "Tasks",
          iconName: "check-box",
          iconColor: "#5E6585",
          backgroundColor: "#5D70BD",
          iconType: "material",
          todos: [
            {
              _id: "0",
              todoTitle: "",
              todoDesc: "",
              isDone: false
            }
          ]
        },
        {
          _id: "65146d85b0307aaab2d1f9f6",
          name: "Getting started",
          iconName: "hand-wave-outline",
          iconColor: "#F3B708",
          backgroundColor: "#5D70BD",
          iconType: "material-community",
          todos: [
            {
              _id: "0",
              todoTitle: "Break this task into smaller steps",
              todoDesc: "0 of 1",
              isDone: true
            },
            {
              _id: "1",
              todoTitle:
                "Tap all the circles in this list to complete your tasks",
              todoDesc: "",
              isDone: true
            },
            {
              _id: "2",
              todoTitle:
                "Check out our sample grocery list and customise it for yourself",
              todoDesc: "",
              isDone: true
            },
            {
              _id: "3",
              todoTitle: "Add #hastags to a task's title to categorise it",
              todoDesc: "",
              isDone: true
            },
            {
              _id: "4",
              todoTitle: "Open this task's detail view to add it to My Day",
              todoDesc: "",
              isDone: true
            },
            {
              _id: "5",
              todoTitle: "👉 Select this task to add a reminder and due date",
              todoDesc: "",
              isDone: true
            },
            {
              _id: "6",
              todoTitle: "Add your first task by clicking on ➕ Add a task",
              todoDesc: "",
              isDone: true
            }
          ]
        },
        {
          _id: "65146d94b0307aaab2d22a72",
          name: "Groceries",
          iconName: "cart-variant",
          iconColor: "#235C47",
          backgroundColor: "#EB8060",
          iconType: "material-community",
          todos: [
            {
              _id: "0",
              todoTitle: "Learn React Native",
              todoDesc: "3 Hours Of Learning React Native",
              isDone: false
            },
            {
              _id: "1",
              todoTitle: "Read some Books",
              todoDesc: "1 Hour Of Reading",
              isDone: false
            },
            {
              _id: "2",
              todoTitle: "WorkOut",
              todoDesc: "go to gym for 1 hour",
              isDone: false
            },
            {
              _id: "3",
              todoTitle: "Read qura'n",
              todoDesc: "30 mins of reading qura'an",
              isDone: false
            },
            {
              _id: "4",
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
