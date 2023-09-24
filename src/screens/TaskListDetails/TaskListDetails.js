import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NotDoneTaskCard from "../../components/NotDoneTaskCard";
import DoneTaskCard from "../../components/DoneTaskCard";

const TaskListDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  console.log("ITEM:====================>", item);
  return (
    <View
      style={{
        backgroundColor: "grey",
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10
      }}
    >
      <Text>
        {item.name}
      </Text>
      <NotDoneTaskCard
        taskTitle={item.todos.notDone[0].todoTitle}
        listName={item.name}
      />
      <DoneTaskCard
        taskTitle={item.todos.done[0].todoTitle}
        listName={item.name}
        iconName={item.iconName}
      />
    </View>
  );
};

export default TaskListDetails;
