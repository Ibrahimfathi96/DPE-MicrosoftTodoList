import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import TaskCard from "../../components/TaskCard";
import styles from "./TaskListDetails.styles";
import { Icon } from "react-native-elements";
const TaskListDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [tasks, setTasks] = useState(item.todos);

  const toggleTaskStatus = taskId => {
    setTasks(prevTasks =>
      prevTasks.map(
        task =>
          task.id === taskId ? { ...task, taskstatus: !task.taskstatus } : task
      )
    );
  };
  console.log("ITEM:====================>", item);
  return (
    <View style={styles.container}>
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
      <View style={{ width: "100%" }}>
        <FlatList
          data={tasks}
          keyExtractor={todo => todo.id.toString()}
          renderItem={({ item: todo }) =>
            <TaskCard
              taskId={todo.id}
              taskTitle={todo.todoTitle}
              listName={item.name}
              iconName={item.iconName}
              pressHandler={toggleTaskStatus} 
              taskstatus={todo.taskstatus}
            />}
        />
      </View>
    </View>
  );
};

export default TaskListDetails;
