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
  console.log("ITEM-IN-DETAILS", item);

  const [incompleteTasks, setIncompleteTasks] = useState(
    item.todos.filter(task => !task.isDone)
  );

  const [completedTasks, setCompletedTasks] = useState(
    item.todos.filter(task => task.isDone)
  );

  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const checkPressHandler = (taskId, isCompleted) => {
    const taskIndex = isCompleted
      ? completedTasks.findIndex(task => task.todoId === taskId)
      : incompleteTasks.findIndex(task => task.todoId === taskId);

    if (taskIndex !== -1) {
      const taskToMove = isCompleted
        ? completedTasks[taskIndex]
        : incompleteTasks[taskIndex];
      const updatedTask = { ...taskToMove, isDone: !isCompleted };

      if (isCompleted) {
        const newCompletedTasks = [...completedTasks];
        newCompletedTasks.splice(taskIndex, 1);
        setCompletedTasks(newCompletedTasks);
        setIncompleteTasks([...incompleteTasks, updatedTask]);
      } else {
        const newIncompleteTasks = [...incompleteTasks];
        newIncompleteTasks.splice(taskIndex, 1);
        setIncompleteTasks(newIncompleteTasks);
        setCompletedTasks([...completedTasks, updatedTask]);
      }
    }
  };

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
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconView}>
              <Icon
                name="person-add-alt-1"
                color="white"
                size={22}
                onPress={() => {}}
              />
            </View>
            <View style={styles.iconView}>
              <Icon
                name="more-horiz"
                color="white"
                size={30}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Two FlatList Of Incompleted/Completed Tasks */}
      <View style={{ width: "100%" }}>
        {/* Incompleted Tasks */}
        <FlatList
          data={incompleteTasks}
          keyExtractor={todo => todo.todoId.toString()}
          renderItem={({ item: todo }) =>
            <TaskCard
              taskId={todo.todoId}
              taskTitle={todo.todoTitle}
              listName={item.name}
              iconName={item.iconName}
              taskstatus={false}
              checkPressHandler={taskId => checkPressHandler(taskId, false)}
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
            keyExtractor={todo => todo.todoId.toString()}
            renderItem={({ item: todo }) =>
              <TaskCard
                taskId={todo.todoId}
                taskTitle={todo.todoTitle}
                listName={item.name}
                iconName={item.iconName}
                taskstatus={true}
                checkPressHandler={taskId => checkPressHandler(taskId, true)}
              />}
          />}
      </View>
    </View>
  );
};

export default TaskListDetails;
