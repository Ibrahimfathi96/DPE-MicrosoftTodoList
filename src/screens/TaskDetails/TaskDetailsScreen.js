import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable
} from "react-native";
import React, { useState } from "react";
import styles from "./TaskDetailsScreen.styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Colors from "../../common/colors";
import { Modal } from "react-native";
import { fetchAllTodos, updateTask } from "../../redux/API/ApiActions";
import { useDispatch } from "react-redux";

const TaskDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
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
  const [description, setDescription] = useState(taskDesc);

  const Spacer = ({ size }) => {
    return <View style={{ flex: size || 1 }} />;
  };

  const handleTaskDataSave = async () => {
    try {
      await dispatch(
        updateTask({
          taskId: taskId,
          todoTitle: title,
          todoDesc: description
        })
      );
      setTitle(title);
      setDescription(description);
      dispatch(fetchAllTodos());
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };

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
          <Text
            onPress={() => setModalVisible(true)}
            style={
              taskstatus
                ? [styles.text, { textDecorationLine: "line-through" }]
                : styles.text
            }
          >
            {title}
          </Text>
          {taskDesc != "" && (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                {description}
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
            style={{
              color: Colors.blueColor,
              fontWeight: "500",
              fontSize: 18
            }}
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
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </View>
          <Pressable
            style={styles.submitButton}
            onPress={() => {
              setVisible(false);
              handleTaskDataSave();
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </>
      )}

      <Spacer size={1} />

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

      {/* Edit Task Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task Title</Text>
            <TextInput
              placeholder="enter the new title"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <View style={styles.modalButtonsView}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButton}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  handleTaskDataSave();
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
