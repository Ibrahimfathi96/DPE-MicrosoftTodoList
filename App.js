import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screens/SignIn/SignInScreen";
import Colors from "./src/common/colors";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <StatusBar barStyle="default" backgroundColor={Colors.blueColor}/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="sign-in-screen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
