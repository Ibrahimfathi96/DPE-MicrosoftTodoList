import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  TextInput
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Avatar } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { clearUser } from "../../redux/reducres/authSlice";
import styles from "./HomeScreen.styles";
import Colors from "../../common/colors";
import {
  fetchStarterListAsync,
  fetchSecondaryListAsync
} from "../../redux/reducres/ApiReducer";
import { setUserId } from "../../redux/reducres/authSlice";
import { fetchListOfTodos, addGroup } from "../../redux/reducres/TodoReducers";

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const personalData = route.params.user;
  console.log("personalData: \n", personalData);
  const userId = personalData._id;
  console.log("userId:", userId);

  const starterListData = useSelector((state) => state.api.starterListData);
  const secondaryListData = useSelector((state) => state.api.secondaryListData);

  const [modalVisible, setModalVisible] = useState(false);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");

  const listOfTodos = useSelector((state) => state.todo.listOfTodos);
  console.log("ListOfTODOS:", listOfTodos);

  useEffect(() => {
    dispatch(fetchStarterListAsync());
    dispatch(fetchSecondaryListAsync());
    dispatch(setUserId(userId));
    dispatch(fetchListOfTodos());
  }, [dispatch, userId]);

  const handleLogout = async () => {
    dispatch(clearUser());
    await AsyncStorage.removeItem("isAuthenticated");
    await AsyncStorage.removeItem("userData");
    navigation.navigate("sign-in-screen");
  };

  const handleCreateGroup = async () => {
    try {
      if (groupName) {
        const newGroup = await dispatch(addGroup({ name: groupName }));
        if (newGroup) {
          setCreateGroupModalVisible(false);
          setGroupName("");
          dispatch(fetchListOfTodos());
        }
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const renderListItem = ({ item }) => {
    const doneTasksCount = item.todos
      ? item.todos.filter((todo) => !todo.isDone).length
      : 0;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("goToTasksDetailsScreen");
          navigation.navigate("tasklist-details-screen", { item });
        }}
      >
        <View style={styles.flatlistItemRow}>
          <Icon
            name={item.iconName}
            type={item.iconType}
            size={26}
            color={item.iconColor}
          />
          <View style={styles.listNameAndLength}>
            <Text style={styles.listName}>{item.name}</Text>
            <Text style={styles.listLength}>{doneTasksCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header Of the screen */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            console.log("OpenModalForProfile");
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Avatar
              rounded
              size={50}
              source={
                personalData && personalData.image
                  ? { uri: personalData.image }
                  : require("../../../assets/pp-placeholder.png")
              }
            />
            <View style={{ marginLeft: 16, flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {personalData ? personalData.name : "Guest"}
                </Text>
                <Icon name="keyboard-arrow-down" type="material" />
              </View>
              <Text style={{ color: "grey", fontWeight: "bold" }}>
                {personalData ? personalData.email : "Guest@example.com"}
              </Text>
            </View>
            <Icon
              name="search"
              size={35}
              color={Colors.blueColor}
              onPress={() => {
                console.log("OpenSearchBar");
              }}
            />
          </View>
        </TouchableOpacity>

        {/* Main Body Of the screen */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Starter List */}
          <View style={styles.upperFlatListView}>
            <FlatList
              data={starterListData}
              keyExtractor={(item) => item._id}
              renderItem={renderListItem}
            />
          </View>

          {/* Secondary List */}
          <View style={styles.lowerFlatListView}>
            <FlatList
              data={secondaryListData}
              keyExtractor={(item) => item._id}
              renderItem={renderListItem}
            />
          </View>

          {/* List Of Added Todos */}
          <View style={styles.lowerFlatListView}>
            <FlatList
              data={listOfTodos}
              keyExtractor={(item) => item._id}
              renderItem={renderListItem}
            />
          </View>
        </ScrollView>

        {/* Bottom Of the screen */}
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              console.log("ADD NEW LIST");
            }}
          >
            <View style={styles.addListButton}>
              <Icon
                name="add"
                type="material"
                color={Colors.blueColor}
                size={30}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: Colors.blueColor,
                  marginLeft: 16
                }}
              >
                New List
              </Text>
            </View>
          </TouchableOpacity>
          <Icon
            name="post-add"
            type="material"
            color={Colors.blueColor}
            size={30}
            onPress={() => setCreateGroupModalVisible(true)}
          />
        </View>
      </View>

      {/* Create Group Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={createGroupModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a group</Text>
            <TextInput
              placeholder="Enter group name"
              placeholderTextColor="gray"
              style={styles.groupNameInput}
              onChangeText={(text) => setGroupName(text)}
              value={groupName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setCreateGroupModalVisible(false)}
              >
                <Text style={styles.modalButton}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateGroup}
                disabled={!groupName}
              >
                <Text
                  style={[
                    styles.modalButton,
                    { color: groupName ? Colors.blueColor : "gray" }
                  ]}
                >
                  CREATE GROUP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal appears when press on Header Of the screen to logOut */}
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Avatar
              rounded
              size={50}
              source={
                personalData && personalData.image
                  ? { uri: personalData.image }
                  : require("../../../assets/pp-placeholder.png")
              }
            />
            <Icon
              name="close"
              color={Colors.blueColor2}
              size={32}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.accountInfo}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.userText}>
                  {personalData ? personalData.name : "Guest"}
                </Text>
                <Icon name="keyboard-arrow-up" type="material" />
              </View>
              <Text style={styles.emailText}>
                {personalData ? personalData.email : "Guest@example.com"}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.modalRowView}>
            <Icon name="add" size={32} />
            <Text style={styles.modalText}>Add Account</Text>
          </View>

          <View style={styles.modalRowView2}>
            <Icon
              name="account-edit-outline"
              size={32}
              type="material-community"
            />
            <Text style={styles.modalText}>Manage Accounts</Text>
          </View>

          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.modalRowView}>
              <Icon name="logout" size={32} color="red" />
              <Text style={[styles.modalText, { color: "red" }]}>LogOut</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
