import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable
} from "react-native";
import React, { useState } from "react";
import styles from "./TaskDetailsScreen.styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Colors from "../../common/colors";
import { Modal } from "react-native";

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [visible, setVisible] = useState(false);
  const { taskId, taskTitle, listName, iconName, taskstatus, taskDesc } =
    route.params;
  console.log("ITEM FROM TASK SCREEN===>", {
    taskId,
    taskTitle,
    listName,
    iconName,
    taskDesc,
    taskstatus
  });

  const [important, setImportant] = useState(false);
  starPressHandler = () => setImportant(!important);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(taskTitle);

  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="arrow-back-ios"
            color="black"
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{listName}</Text>
      </View>

      {/**Task Details */}
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={taskstatus ? styles.doneTaskcard : styles.notDoneTaskCard}
          >
            {taskstatus && <Icon name="check" size={20} color="white" />}
          </View>
        </TouchableOpacity>
        <View style={styles.titleTextView}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={
                taskstatus
                  ? [styles.text, { textDecorationLine: "line-through" }]
                  : styles.text
              }
            >
              {taskTitle}
            </Text>
          </TouchableOpacity>
          {taskDesc != "" && (
            <View style={{ flexDirection: "row", marginHorizontal: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                {taskDesc}
              </Text>
            </View>
          )}
        </View>
        <Icon
          name={important ? "star" : "star-outline"}
          size={30}
          color={important ? Colors.blueColor2 : "black"}
          onPress={starPressHandler}
        />
      </View>

      {/**Add Description Button */}
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <View style={styles.addDesc}>
          <Icon
            name="add"
            color={Colors.blueColor}
            size={36}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{ color: Colors.blueColor, fontWeight: "500", fontSize: 18 }}
          >
            Add / Edit Description
          </Text>
        </View>
      </TouchableOpacity>

      {/**Add Description TextInput */}
      {visible && (
        <>
          <View style={styles.descView}>
            <TextInput
              placeholder="Write some description"
              multiline
              style={{ fontSize: 16 }}
            />
          </View>
          <Pressable
            style={styles.submitButton}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </>
      )}

      {/**Delete Task Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
        <View style={{ flexDirection: "row" }}>
          <Icon
            name="delete"
            size={26}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.deleteText}>Delete Task</Text>
        </View>
      </TouchableOpacity>

      {/* Edit GroupName Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Tasl Title</Text>
            <TextInput
              placeholder="enter the new title"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={(text) => setTitle(text)}
              value={taskTitle}
            />
            <View style={styles.modalButtonsView}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButton}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                disabled={!title}
              >
                <Text
                  style={[
                    styles.modalButton,
                    { color: title ? Colors.blueColor : "#DBDBDB" }
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskDetailsScreen;
