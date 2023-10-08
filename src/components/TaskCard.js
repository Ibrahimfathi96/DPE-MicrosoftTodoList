import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../common/colors";
import { useNavigation } from "@react-navigation/native";

export default function TaskCard({
  taskId,
  taskTitle,
  listName,
  iconName,
  taskstatus,
  checkPressHandler
}) {
  const navigation = useNavigation();

  const openTaskDetails = () => {
    navigation.navigate("task-details-screen", {
      taskId,
      taskTitle,
      listName,
      iconName,
      taskstatus
    });
  };

  const [important, setImportant] = useState(false);
  starPressHandler = () => setImportant(!important);
  return (
    <TouchableOpacity onPress={openTaskDetails}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => checkPressHandler(taskId)}>
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
        <Icon
          name={important ? "star-outline" : "star"}
          size={30}
          color={important ? "black" : Colors.blueColor2}
          onPress={starPressHandler}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    marginVertical: 2,
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  doneTaskcard: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blueColor
  },
  notDoneTaskCard: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "grey"
  },
  titleTextView: {
    paddingLeft: 20,
    flex: 1,
    flexDirection: "column"
  },
  text: {
    fontSize: 16,
    fontWeight: "500"
  }
});
