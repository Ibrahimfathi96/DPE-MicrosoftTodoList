import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../../components/TaskCard";
import styles from "./GroupDetails.styles";
import { Icon } from "react-native-elements";
import Colors from "../../common/colors";
import {
  setListId,
  setIncompleteTasks,
  setCompletedTasks
} from "../../redux/reducres/TodoSlice";
import {
  fetchAllTasks,
  addTask,
  fetchGroups,
  updateTask,
  updateGroup,
  deleteGroup
} from "../../redux/API/ApiActions";
const TaskListDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { item } = route.params;
  const listId = item._id;

  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const [editGroupModalVisible, setEditGroupModalVisible] = useState(false);
  const [groupOptionsModalVisible, setGroupOptionsModalVisible] =
    useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  const [groupName, setGroupName] = useState(item.name);

  const Todos = useSelector((state) => state.todo.todos);
  console.log("Todos:", Todos);

  const incompleteTasks = Todos.filter((todo) => !todo.isDone);
  const completedTasks = Todos.filter((todo) => todo.isDone);

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const handleCreateTask = async () => {
    try {
      if (taskTitle) {
        const newTask = await dispatch(addTask({ todoTitle: taskTitle }));
        if (newTask) {
          setCreateTaskModalVisible(false);
          setTaskTitle("");
          dispatch(fetchAllTasks());
        }
      }
    } catch (error) {
      console.error("Error creating Task:", error);
    }
  };

  const checkPressHandler = async (taskId, isCompleted) => {
    try {
      await dispatch(updateTask({ taskId, isDone: !isCompleted }));

      const updatedTodos = Todos.map((todo) => {
        if (todo._id === taskId) {
          return { ...todo, isDone: !isCompleted };
        }
        return todo;
      });
      dispatch(setIncompleteTasks(incompleteTasks));
      dispatch(setCompletedTasks(completedTasks));
      dispatch(fetchAllTasks());
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleGroupNameSave = async () => {
    try {
      await dispatch(
        updateGroup({
          name: groupName,
          iconName: item.iconName,
          iconColor: item.iconColor,
          iconType: item.iconType,
          backgroundColor: item.backgroundColor
        })
      );
      setGroupName(groupName);
      dispatch(fetchGroups());
    } catch (error) {
      console.error("Error updating group name:", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await dispatch(deleteGroup(item._id));
      dispatch(fetchGroups());
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  useEffect(() => {
    dispatch(setListId(listId));
    dispatch(fetchGroups());
    dispatch(fetchAllTasks());
  }, [dispatch, listId]);

  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View style={styles.titleAndBackIcon}>
          <TouchableOpacity
            onPress={() => {
              dispatch(fetchGroups());
              navigation.goBack();
            }}
          >
            <Icon name="arrow-back-ios" color="white" />
          </TouchableOpacity>

          <Text
            style={styles.headerText}
            onPress={() => setEditGroupModalVisible(true)}
          >
            {groupName}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconView}>
            <Icon
              name="person-add-alt-1"
              color="white"
              size={22}
              onPress={() => {}}
            />
          </View>
          <TouchableOpacity onPress={() => setGroupOptionsModalVisible(true)}>
            <View style={styles.iconView}>
              <Icon name="more-horiz" color="white" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Two FlatList Of Incompleted/Completed Tasks */}
      <View style={{ width: "100%" }}>
        {/* Incompleted Tasks */}
        <FlatList
          data={incompleteTasks}
          keyExtractor={(todo) => todo._id}
          renderItem={({ item: todo }) => (
            <TaskCard
              taskId={todo._id}
              taskTitle={todo.todoTitle}
              taskDesc={todo.todoDesc}
              listName={item.name}
              iconName={item.iconName}
              taskstatus={false}
              handleNavigate={() => {
                console.log("ITEM FOR NAVIGATION:", todo);
                navigation.navigate("task-details-screen", {
                  todo: todo,
                  listName: item.name
                });
              }}
              checkPressHandler={(taskId) => checkPressHandler(taskId, false)}
            />
          )}
        />

        {/* Seperator between two FlatLists */}
        {incompleteTasks.length > 0 && (
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
                name={
                  showCompletedTasks ? "expand-more" : "keyboard-arrow-right"
                }
                color="white"
                onPress={toggleCompletedTasks}
              />
              <Text style={styles.separatorText}>Completed Tasks</Text>
              <Text style={styles.separatorNum}>{completedTasks.length}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Completed Tasks */}
        {showCompletedTasks && (
          <FlatList
            data={completedTasks}
            keyExtractor={(todo) => todo._id}
            renderItem={({ item: todo }) => (
              <TaskCard
                taskId={todo._id}
                taskTitle={todo.todoTitle}
                taskDesc={todo.todoDesc}
                listName={item.name}
                iconName={item.iconName}
                taskstatus={true}
                handleNavigate={() => {
                  console.log("ITEM FOR NAVIGATION:", todo);
                  navigation.navigate("task-details-screen", {
                    todo: todo,
                    listName: item.name
                  });
                }}
                checkPressHandler={(taskId) => checkPressHandler(taskId, true)}
              />
            )}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <View style={styles.floatingButton}>
        <TouchableOpacity onPress={() => setCreateTaskModalVisible(true)}>
          <View style={styles.addTaskButton}>
            <Icon name="add-task" type="material" color="white" size={26} />
            <Text style={styles.newTaskText}>New Task</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Create Task Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={createTaskModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a task</Text>
            <TextInput
              placeholder="Name this Task"
              placeholderTextColor="gray"
              style={styles.taskNameInput}
              onChangeText={(text) => setTaskTitle(text)}
              value={taskTitle}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setCreateTaskModalVisible(false)}
              >
                <Text style={styles.modalButton}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateTask}
                disabled={!taskTitle}
              >
                <Text
                  style={[
                    styles.modalButton,
                    { color: taskTitle ? Colors.blueColor : "#DBDBDB" }
                  ]}
                >
                  CREATE TASK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit GroupName Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editGroupModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Group Name</Text>
            <TextInput
              placeholder="enter the new name"
              placeholderTextColor="gray"
              style={styles.taskNameInput}
              onChangeText={(text) => setGroupName(text)}
              value={groupName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditGroupModalVisible(false)}>
                <Text style={styles.modalButton}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditGroupModalVisible(false);
                  handleGroupNameSave();
                }}
                disabled={!groupName}
              >
                <Text
                  style={[
                    styles.modalButton,
                    { color: groupName ? Colors.blueColor : "#DBDBDB" }
                  ]}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Options Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={groupOptionsModalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => setGroupOptionsModalVisible(false)}
        >
          <View style={styles.optionsContainer}>
            {/**Rename List */}
            <View style={styles.optionsContent}>
              <TouchableOpacity
                onPress={() => {
                  setGroupOptionsModalVisible(false);
                  setEditGroupModalVisible(true);
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="edit" size={26} style={{ marginRight: 10 }} />
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    Rename List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/**Sort List */}
            <View style={styles.optionsContent}>
              <TouchableOpacity
                onPress={() => setGroupOptionsModalVisible(false)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="sort-by-alpha"
                    size={26}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    Sort List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/**Change Theme*/}
            <View style={styles.optionsContent}>
              <TouchableOpacity
                onPress={() => setGroupOptionsModalVisible(false)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="palette-outline"
                    type="material-community"
                    size={26}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    Change Theme
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/**Send a copy */}
            <View style={styles.optionsContent}>
              <TouchableOpacity
                onPress={() => setGroupOptionsModalVisible(false)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="share" size={26} style={{ marginRight: 10 }} />
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    Send a Copy
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/**Duplicate List*/}
            <View style={styles.optionsContent}>
              <TouchableOpacity
                onPress={() => setGroupOptionsModalVisible(false)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="content-copy"
                    size={26}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    Duplicate List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/**Print List*/}
            <View style={styles.optionsContent}>
              <TouchableOpacity
                onPress={() => setGroupOptionsModalVisible(false)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name="print" size={26} style={{ marginRight: 10 }} />
                  <Text style={{ fontWeight: "500", fontSize: 18 }}>
                    Print List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/**Delete List */}
            <View style={styles.optionsContent}>
              <TouchableOpacity onPress={() => handleDeleteGroup()}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="delete"
                    size={26}
                    color="red"
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{ fontWeight: "500", fontSize: 18, color: "red" }}
                  >
                    Delete List
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default TaskListDetails;
