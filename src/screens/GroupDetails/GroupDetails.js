import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal
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
import { fetchAllTodos, addTask, updateTask } from "../../redux/API/ApiActions";
const TaskListDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { item } = route.params;
  const listId = item._id;

  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  const Todos = useSelector((state) => state.todo.todos);
  console.log("Todos:", Todos);

  const handleCreateTask = async () => {
    try {
      if (taskTitle) {
        const newTask = await dispatch(addTask({ todoTitle: taskTitle }));
        if (newTask) {
          setCreateTaskModalVisible(false);
          setTaskTitle("");
          dispatch(fetchAllTodos());
        }
      }
    } catch (error) {
      console.error("Error creating Task:", error);
    }
  };

  const incompleteTasks = Todos.filter((todo) => !todo.isDone);
  const completedTasks = Todos.filter((todo) => todo.isDone);

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
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
      dispatch(fetchAllTodos());
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    dispatch(setListId(listId));
    dispatch(fetchAllTodos());
  }, [dispatch, listId]);

  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View style={styles.titleAndBackIcon}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-back-ios" color="white" />
          </TouchableOpacity>

          <Text style={styles.headerText}>{item.name}</Text>
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
              listName={item.name}
              iconName={item.iconName}
              taskstatus={false}
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
                listName={item.name}
                iconName={item.iconName}
                taskstatus={true}
                checkPressHandler={(taskId) => checkPressHandler(taskId, true)}
              />
            )}
          />
        )}
      </View>

      <View style={styles.floatingButton}>
        <TouchableOpacity onPress={() => setCreateTaskModalVisible(true)}>
          <Icon name="add" type="material" size={40} color={Colors.blueColor} />
        </TouchableOpacity>
      </View>

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
    </View>
  );
};

export default TaskListDetails;
