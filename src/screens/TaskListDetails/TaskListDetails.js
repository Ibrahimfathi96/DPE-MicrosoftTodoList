import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TaskCard from "../../components/TaskCard";
import styles from "./TaskListDetails.styles";
import { Icon } from "react-native-elements";
const TaskListDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  // Separate state variables for incomplete and completed todos
  const [incompleteTasks, setIncompleteTasks] = useState(item.todos);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  // Function to toggle the visibility of completed tasks
  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  // Function to mark a task as completed and move it to the completed list
  const markTaskAsCompleted = taskId => {
    const taskToComplete = incompleteTasks.find(task => task.id === taskId);
    if (taskToComplete) {
      taskToComplete.taskstatus = true;
      setCompletedTasks([...completedTasks, taskToComplete]);
      setIncompleteTasks(incompleteTasks.filter(task => task.id !== taskId));
    }
  };
  console.log("ITEM:====================>", item);
  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.centerTitle}>
          <Text style={styles.headerText}>
            {item.name}
          </Text>
          <Icon name="more-vert" color="white" onPress={() => {}} />
        </View>
      </View>
      {/* Two FlatList Of Incompleted/Completed Tasks   keyboard_arrow_right*/}
      <View style={{ width: "100%" }}>
        {/* Incompleted Tasks */}
        <FlatList
          data={incompleteTasks}
          keyExtractor={todo => todo.id.toString()}
          renderItem={({ item: todo }) =>
            <TaskCard
              taskId={todo.id}
              taskTitle={todo.todoTitle}
              listName={item.name}
              iconName={item.iconName}
              pressHandler={() => markTaskAsCompleted(todo.id)}
              taskstatus={todo.taskstatus}
            />}
        />
        {/* Seperator between two FlatLists */}
        <TouchableOpacity onPress={toggleCompletedTasks}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginVertical: 20,
              alignItems: "center"
            }}
          >
            <Icon
              name={showCompletedTasks ? "expand-more" : "keyboard-arrow-right"}
              color="white"
              onPress={toggleCompletedTasks}
            />
            <Text style={styles.separatorText}>Completed Tasks</Text>
            <Text style={styles.separatorNum}>
              {completedTasks.length}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Completed Tasks */}
        {showCompletedTasks &&
          <FlatList
            data={completedTasks}
            keyExtractor={todo => todo.id.toString()}
            renderItem={({ item: todo }) =>
              <TaskCard
                taskId={todo.id}
                taskTitle={todo.todoTitle}
                listName={item.name}
                iconName={item.iconName}
                pressHandler={() => {}}
                taskstatus={true} // Marked as completed
              />}
          />}
      </View>
    </View>
  );
};

export default TaskListDetails;
