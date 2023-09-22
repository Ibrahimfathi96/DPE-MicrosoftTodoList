import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/reducres/authSlice";
import styles from "./HomeScreen.styles";
import Colors from "../../common/colors";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
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

  return (
    <View style={styles.container}>
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
      {/* For Testing */}
      {/* <TouchableOpacity onPress={handleLogout}>
        <Text>logout</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;
