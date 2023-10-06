import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./TaskDetailsScreen.styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId, taskTitle, listName, iconName, taskstatus } = route.params;
  console.log("ITEM FROM TASK SCREEN===>", {
    taskId,
    taskTitle,
    listName,
    iconName,
    taskstatus
  });
  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-ios" color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{listName}</Text>
      </View>

      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={taskstatus ? styles.doneTaskcard : styles.notDoneTaskCard}
          >
            {taskstatus && <Icon name="check" size={20} color="white" />}
          </View>
        </TouchableOpacity>

        <View style={styles.titleTextView}>
          <Text
            style={
              taskstatus
                ? [styles.text, { textDecorationLine: "line-through" }]
                : styles.text
            }
          >
            {taskTitle}
          </Text>
          {listName == "Tasks" && (
            <View style={{ flexDirection: "row", marginHorizontal: 4 }}>
              <Icon name={iconName} size={18} />
              <Text>{listName}</Text>
            </View>
          )}
        </View>
        <Icon name="star-outline" size={26} />
      </View>
    </View>
  );
};

export default TaskDetailsScreen;
