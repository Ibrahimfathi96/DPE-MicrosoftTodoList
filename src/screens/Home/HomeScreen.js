import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/reducres/authSlice";
import styles from "./HomeScreen.styles";
import Colors from "../../common/colors";
import { dummyListOfTodos } from "../../common/dummyListOftodos";
import { addedLists } from "../../common/dummyListOftodos";
import {
  fetchStarterListAsync,
  fetchSecondaryListAsync
} from "../../redux/reducres/TodoReducer";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const starterListData = useSelector(state => state.api.starterListData);
  const secondaryListData = useSelector(state => state.api.secondaryListData);

  useEffect(
    () => {
      dispatch(fetchStarterListAsync());
      dispatch(fetchSecondaryListAsync());
    },
    [dispatch]
  );
  const personalData = useSelector(state => state.auth.personalData);
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Error clearing authentication data:", error);
    }
    dispatch(logout());
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10
          }}
        >
          <Icon
            name={item.iconName}
            type={item.iconType}
            size={26}
            color={item.iconColor}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 30
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
                color: "grey"
              }}
            >
              {item.todos.filter(todo => !todo.isDone).length}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {/* Header Of the screen */}
        <TouchableOpacity onPress={console.log("OpenModalForProfile")}>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              rounded
              size={50}
              source={
                personalData
                  ? personalData.image
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
        {/* Suggested List */}
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 10,
            paddingBottom: 16,
            borderBottomColor: "grey",
            borderBottomWidth: 0.7
          }}
        >
          <FlatList
            data={starterListData}
            keyExtractor={item => item._id}
            renderItem={renderListItem}
          />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            paddingBottom: 16
          }}
        >
          <FlatList
            data={secondaryListData}
            keyExtractor={item => item._id}
            renderItem={renderListItem}
          />
        </View>
      </View>
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

      {/* For Testing */}
      {/* <TouchableOpacity onPress={handleLogout}>
        <Text>logout</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;
