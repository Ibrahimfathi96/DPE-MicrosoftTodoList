import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/Auth/SignInScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/reducres/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskListDetails from "../screens/GroupDetails/GroupDetails";
import TaskDetailsScreen from "../screens/TaskDetails/TaskDetailsScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();
export default function RouteNavigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const user = JSON.parse(userData);
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        dispatch(clearUser());
      }
    };

    checkAuthentication();
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="home-screen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="sign-in-screen"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
        )}

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
