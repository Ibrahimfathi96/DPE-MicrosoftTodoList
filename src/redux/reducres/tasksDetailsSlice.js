import { createSlice } from "@reduxjs/toolkit";

const tasksDetailsSlice = createSlice({
  name: "tasks",
  initialState: {
    incompleteTasks: [],
    completedTasks: []
  },
  reducers: {
    addIncompleteTask: (state, action) => {
      state.incompleteTasks.push(action.payload);
    },
    uncompleteTask: (state, action) => {
      const taskId = action.payload;
      const taskToUncomplete = state.completedTasks.find(
        task => task.todoId === taskId
      );
      if (taskToUncomplete) {
        taskToUncomplete.taskstatus = false;
        state.incompleteTasks.push(taskToUncomplete);
        state.completedTasks = state.completedTasks.filter(
          task => task.todoId !== taskId
        );
      }
    },
    markTaskAsCompleted: (state, action) => {
      const taskId = action.payload;
      const taskToComplete = state.incompleteTasks.find(
        task => task.todoId === taskId
      );
      if (taskToComplete) {
        taskToComplete.taskstatus = true;
        state.completedTasks.push(taskToComplete);
        state.incompleteTasks = state.incompleteTasks.filter(
          task => task.todoId !== taskId
        );
      }
    }
  }
});

export const {
  uncompleteTask,
  addIncompleteTask,
  markTaskAsCompleted
} = tasksDetailsSlice.actions;

export default tasksDetailsSlice.reducer;
