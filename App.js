import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import Colors from "./src/common/colors";
import RouteNavigation from "./src/Navigation/RouteNavigation";
import store from "./src/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "./src/redux/reducres/authSlice";

export default function App() {
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const user = JSON.parse(userData);
          store.dispatch(setUser(user));
        }
      } catch (error) {
        console.error(
          "Error reading user data from AsyncStorage:",
          error + "\n" + error.message
        );
      }
    };

    loadUserData();
  }, []);
  return (
    <Provider store={store}>
      <StatusBar barStyle="default" backgroundColor={Colors.blueColor} />
      <RouteNavigation />
    </Provider>
  );
}
