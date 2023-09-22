import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../redux/reducres/authSlice";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Home Screen</Text>
      <Text>
        Welcome, {personalData ? personalData.name : "Guest"}{" "}
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          width: "70%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: 50,
          borderRadius: 26,
          marginTop: 16
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
