const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
                todoTitle: {
                  required: true,
                  type: String
                },
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
      default: []
    }
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
