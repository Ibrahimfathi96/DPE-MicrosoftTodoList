import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/Auth/SignInScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/reducres/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskListDetails from "../screens/TaskListDetails/TaskListDetails";
import TaskDetailsScreen from "../screens/TaskDetails/TaskDetailsScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();
export default function RouteNavigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(
    () => {
      const checkAuthentication = async () => {
        try {
          const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
          return isAuthenticated === "true";
        } catch (error) {
          console.error("Error checking authentication:", error);
          return false;
        }
      };

      checkAuthentication().then(authenticated => {
        if (authenticated) {
          dispatch(setUser());
        } else {
          dispatch(clearUser());
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
        <Stack.Screen
          name="register-screen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tasklist-details-screen"
          component={TaskListDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="task-details-screen"
          component={TaskDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
