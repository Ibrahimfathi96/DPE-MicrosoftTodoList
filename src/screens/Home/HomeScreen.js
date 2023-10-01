import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView
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
} from "../../redux/reducres/TodoReducer";

const HomeScreen = () => {
  const route = useRoute();
  const personalData = route.params.user;
  console.log("personalData", personalData);
  const dispatch = useDispatch();
  const starterListData = useSelector(state => state.api.starterListData);
  const secondaryListData = useSelector(state => state.api.secondaryListData);
  const [modalVisible, setModalVisible] = useState(false);
  const [listOfTodos, setListOfTodos] = useState(personalData.listOfTodos);
  console.log("ListOfTODOS:", listOfTodos);

  useEffect(
    () => {
      dispatch(fetchStarterListAsync());
      dispatch(fetchSecondaryListAsync());
    },
    [dispatch]
  );
  const navigation = useNavigation();
  const handleLogout = async () => {
    dispatch(clearUser());
    await AsyncStorage.removeItem("isAuthenticated");
    navigation.navigate("sign-in-screen");
  };

  const renderListItem = ({ item }) => {
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
            <Text style={styles.listName}>
              {item.name}
            </Text>
            <Text style={styles.listLength}>
              {item.todos.filter(todo => !todo.isDone).length}
            </Text>
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
              keyExtractor={item => item._id}
              renderItem={renderListItem}
            />
          </View>

          {/* Secondary List */}
          <View style={styles.lowerFlatListView}>
            <FlatList
              data={secondaryListData}
              keyExtractor={item => item._id}
              renderItem={renderListItem}
            />
          </View>

          {/* List Of Added Todos */}
          <View style={styles.lowerFlatListView}>
            <FlatList
              data={listOfTodos}
              keyExtractor={item => item._id}
              renderItem={renderListItem}
            />
          </View>
        </ScrollView>
        {/* Bottom Of the screen */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("ADD NEW LIST");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
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
            onPress={() => {
              console.log("ADD NEW GROUP");
            }}
          />
        </View>
      </View>

      {/* Modal appears when press on Header Of the screen to logOut */}
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Avatar
              rounded
              size={70}
              source={
                personalData
                  ? personalData.image
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
