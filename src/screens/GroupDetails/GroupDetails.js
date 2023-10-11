import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../../components/TaskCard";
import styles from "./GroupDetails.styles";
import { Icon } from "react-native-elements";
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
  deleteGroup,
  deleteTask
} from "../../redux/API/ApiActions";
import FloatingActionButton from "../../components/FloatingActionButton";
import CreateModal from "../../components/CreateModal";
import OptionsModal from "../../components/OptionsModal";
import deleteAlert from "../../components/deleteAlert";
const TaskListDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { item, selectedIcon: groupIcon } = route.params;
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
  const [selectedColor, setSelectedColor] = useState(item.backgroundColor);
  const [selectedView, setSelectedView] = useState("");
  const [iconPickerVisible, setIconPickerVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(groupIcon);

  const incompleteTasks = Todos.filter((todo) => !todo.isDone);
  const completedTasks = Todos.filter((todo) => todo.isDone);

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const handleCreateTask = async () => {
    try {
      if (taskTitle) {
        const localTaskData = { todoTitle: taskTitle, isDone: false };
        const newTask = dispatch(addTask(localTaskData));
        if (newTask) {
          setCreateTaskModalVisible(false);
          setTaskTitle("");
        }
      }
    } catch (error) {
      console.error("Error creating Task:", error);
    }
  };

  const checkPressHandler = async (taskId, isCompleted) => {
    try {
      const updatedTodos = Todos.map((todo) => {
        if (todo._id === taskId) {
          const updatedTodo = { ...todo, isDone: !isCompleted };
          return updatedTodo;
        }
        return todo;
      });

      dispatch(setIncompleteTasks(updatedTodos.filter((todo) => !todo.isDone)));
      dispatch(setCompletedTasks(updatedTodos.filter((todo) => todo.isDone)));

      await dispatch(updateTask({ taskId, isDone: !isCompleted }));

      dispatch(fetchAllTasks());
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleGroupNameSave = async () => {
    try {
      const updatedGroup = {
        ...item,
        name: groupName,
        backgroundColor: selectedColor,
        iconName: selectedIcon.iconName,
        iconColor: selectedIcon.iconColor
      };
      await dispatch(updateGroup(updatedGroup));
      setGroupName(groupName);
      setSelectedColor(selectedColor);
      setSelectedIcon(selectedIcon);
      setIconPickerVisible(false);
      setColorPickerVisible(false);
      setSelectedView("");
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

  const updateTodos = async () => {
    await dispatch(fetchAllTasks());
    const updatedIncompleteTasks = Todos.filter((todo) => !todo.isDone);
    const updatedCompletedTasks = Todos.filter((todo) => todo.isDone);
    await dispatch(setIncompleteTasks(updatedIncompleteTasks));
    await dispatch(setCompletedTasks(updatedCompletedTasks));
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      dispatch(fetchAllTasks());
      updateTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleIconSelection = (icon) => {
    setSelectedIcon(icon);
  };

  useEffect(() => {
    dispatch(setListId(listId));
    dispatch(fetchGroups());
    dispatch(fetchAllTasks());
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
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
              handleDeleteTask={() => handleDeleteTask(todo._id)}
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
            <View style={styles.separatorView}>
              <View style={styles.insideView}>
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
                handleDeleteTask={() => handleDeleteTask(todo._id)}
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
      <FloatingActionButton
        text={"New Task"}
        iconName="add-task"
        onPressHandler={() => setCreateTaskModalVisible(true)}
      />

      {/* Create Task Modal */}
      <CreateModal
        visible={createTaskModalVisible}
        modalTitle="Create a task"
        placeholder="Name this Task"
        value={taskTitle}
        onChangeTextHandler={(text) => setTaskTitle(text)}
        nagativeActionHandler={() => setCreateTaskModalVisible(false)}
        positiveActionHandler={handleCreateTask}
        positiveActionText="CREATE TASK"
        disabled={!taskTitle}
        isGroupModal={false}
        iconPickerVisible={false}
        colorPickerVisible={false}
      />

      {/* Edit GroupName Modal */}
      <CreateModal
        visible={editGroupModalVisible}
        modalTitle="Edit Group Name"
        placeholder="enter the new name"
        value={groupName}
        onChangeTextHandler={(text) => setGroupName(text)}
        nagativeActionHandler={() => setEditGroupModalVisible(false)}
        positiveActionHandler={() => {
          handleGroupNameSave();
          setEditGroupModalVisible(false);
        }}
        positiveActionText="Edit"
        disabled={!groupName}
        isGroupModal={true}
        setSelectedColor={setSelectedColor}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        colorPickerVisible={colorPickerVisible}
        setColorPickerVisible={setColorPickerVisible}
        iconPickerVisible={iconPickerVisible}
        setIconPickerVisible={setIconPickerVisible}
        handleIconSelection={handleIconSelection}
      />

      {/* Options Modal */}
      <OptionsModal
        visible={groupOptionsModalVisible}
        onModalPressHandler={() => setGroupOptionsModalVisible(false)}
        onRenameListPress={() => {
          setGroupOptionsModalVisible(false);
          setEditGroupModalVisible(true);
        }}
        onChangeThemePress={() => setEditGroupModalVisible(true)}
        onDeleteListPress={() => {
          deleteAlert({
            name: groupName,
            onPress: () => handleDeleteGroup()
          });
        }}
      />
    </View>
  );
};

export default TaskListDetails;
