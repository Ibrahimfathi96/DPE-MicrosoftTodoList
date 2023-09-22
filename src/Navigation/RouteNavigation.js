import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/SignIn/SignInScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/reducres/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
export default function RouteNavigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect(
    () => {
      const checkAuthentication = async () => {
        try {
          const isAuthenticated = await AsyncStorage.getItem("isLoggedIn");
          return isAuthenticated === "true";
        } catch (error) {
          console.error("Error checking authentication:", error);
          return false;
        }
      };

      checkAuthentication().then(authenticated => {
        if (authenticated) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      });
    },
    [dispatch]
  );
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "home-screen" : "sign-in-screen"}
      >
        <Stack.Screen
          name="home-screen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-in-screen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
