import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  TextInput,
  RefreshControl
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { clearUser, setUserId } from "../../redux/reducres/authSlice";
import styles from "./HomeScreen.styles";
import Colors from "../../common/colors";
import { fetchGroups, addGroup } from "../../redux/API/ApiActions";
import ColorList from "../../components/ColorsPicker";
import IconsPicker from "../../components/IconsPicker";
import icons from "../../common/icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const personalData = useSelector((state) => state.auth.user);
  const userId = personalData._id;

  const [modalVisible, setModalVisible] = useState(false);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(Colors.DEFAULT);
  const [selectedIcon, setSelectedIcon] = useState(icons.TOC);
  const [selectedView, setSelectedView] = useState("");
  const [iconPickerVisible, setIconPickerVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const groups = useSelector((state) => state.todo.groups);

  useEffect(() => {
    dispatch(setUserId(userId));
    dispatch(fetchGroups());
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
        const newGroup = await dispatch(
          addGroup({
            name: groupName,
            backgroundColor: selectedColor,
            iconName: selectedIcon.iconName,
            iconColor: selectedIcon.iconColor
          })
        );
        console.log("newGroup", newGroup);
        if (newGroup) {
          setCreateGroupModalVisible(false);
          setGroupName("");
          setSelectedColor("");
          setSelectedIcon(null);
          setIconPickerVisible(false);
          setColorPickerVisible(false);
          setSelectedView("");
          dispatch(fetchGroups());
        } else {
          console.error("Please select a group name, color, and icon.");
        }
      }
    } catch (error) {
      console.error(
        "Error creating group:",
        error + "\n" + "errorMsg:" + error.message
      );
    }
  };

  const handleIconSelection = (icon) => {
    setSelectedIcon(icon);
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await dispatch(fetchGroups());
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderListItem = ({ item }) => {
    const doneTasksCount = item.todos
      ? item.todos.filter((todo) => !todo.isDone).length
      : 0;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("tasklist-details-screen", { item });
        }}
      >
        <View style={styles.flatlistItemRow}>
          <TouchableOpacity onPress={() => {}}>
            <Icon
              name={item.iconName}
              type={item.iconType}
              size={26}
              color={item.iconColor}
            />
          </TouchableOpacity>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.blueColor}
            />
          }
        >
          {/* Starter List */}
          <View style={styles.upperFlatListView}>
            <FlatList
              data={groups.slice(0, 6)}
              keyExtractor={(item) => item._id}
              renderItem={renderListItem}
            />
          </View>

          {/* Secondary List */}
          <View style={styles.lowerFlatListView}>
            <FlatList
              data={groups.slice(6)}
              keyExtractor={(item) => item._id}
              renderItem={renderListItem}
            />
          </View>
        </ScrollView>
      </View>

      {/* FloatingActionButton */}
      <View style={styles.floatingButton}>
        <TouchableOpacity onPress={() => setCreateGroupModalVisible(true)}>
          <View style={styles.addListButton}>
            <Icon name="post-add" type="material" color="white" size={26} />
            <Text style={styles.newListText}>New Group</Text>
          </View>
        </TouchableOpacity>
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
              placeholder="Name this group"
              placeholderTextColor="gray"
              style={styles.groupNameInput}
              onChangeText={(text) => setGroupName(text)}
              value={groupName}
            />

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setColorPickerVisible(!colorPickerVisible);
                  setIconPickerVisible(false);
                  setSelectedView("color");
                }}
              >
                <View
                  style={[
                    styles.chooseIconOrColor,
                    {
                      backgroundColor:
                        selectedView === "color"
                          ? Colors.blueColor
                          : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={{
                      color: selectedView === "color" ? "white" : "black"
                    }}
                  >
                    COLOR
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIconPickerVisible(!iconPickerVisible);
                  setColorPickerVisible(false);
                  setSelectedView("icon");
                }}
              >
                <View
                  style={[
                    styles.chooseIconOrColor,
                    {
                      backgroundColor:
                        selectedView === "icon"
                          ? Colors.blueColor
                          : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={{
                      color: selectedView === "icon" ? "white" : "black"
                    }}
                  >
                    ICON
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {iconPickerVisible && (
              <IconsPicker onIconSelect={handleIconSelection} />
            )}

            {colorPickerVisible && (
              <ColorList onColorSelect={setSelectedColor} />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setCreateGroupModalVisible(false);
                  setIconPickerVisible(false);
                  setColorPickerVisible(false);
                  setSelectedView("");
                }}
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
                    { color: groupName ? Colors.blueColor : "#DBDBDB" }
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
