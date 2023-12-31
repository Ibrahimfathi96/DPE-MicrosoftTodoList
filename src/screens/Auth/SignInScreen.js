import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid
} from "react-native";
import styles from "./Auth.Styles";
import Checkbox from "expo-checkbox";
import Colors from "../../common/colors";
import { signIn } from "../../redux/API/ApiServices";
import { setUser } from "../../redux/reducres/authSlice.js";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isShownPassword, setIsShownPassword] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user) {
      setEmail("");
      setPassword("");
    }
  }, [user]);

  const handlePasswordVisibilityToggle = () => {
    setIsShownPassword(!isShownPassword);
  };

  const handleSignInPress = async () => {
    try {
      const user = await signIn(email, password);
      if (user) {
        setError(null);
        await AsyncStorage.setItem("userData", JSON.stringify(user));
        ToastAndroid.showWithGravity(
          "Successfully logged-in. Welcome back!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        dispatch(setUser(user));
        navigation.navigate("home-screen");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Login Failed\nPlease check your credentials and try again.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      setError("Please check your credentials.");
      console.error("Login error:", error + "\n" + error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
      setError(null);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.wrapper}>
          <Text style={styles.signinText}>LOGIN</Text>

          {/**Email Text Fields*/}
          <View style={styles.textInputsMainView}>
            <Text style={styles.text}>Email :</Text>
            <TextInput
              placeholder="Enter E-mail"
              style={styles.textInput}
              value={email}
              onChangeText={(text) => {
                setError(null);
                setEmail(text);
              }}
            />
          </View>

          {/**Password Text Fields*/}
          <View style={styles.textInputsMainView}>
            <Text style={styles.text}>Password :</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.textInput}
              secureTextEntry={!isShownPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null);
              }}
            />
          </View>

          {/**Show Password Checkbox */}
          <View style={styles.CheckBoxView}>
            <Checkbox
              value={isShownPassword}
              onValueChange={handlePasswordVisibilityToggle}
              color={isShownPassword ? Colors.blueColor : undefined}
              style={{ padding: 0 }}
            />
            <Pressable onPress={handlePasswordVisibilityToggle}>
              <Text style={{ marginLeft: 6 }}>Show Password</Text>
            </Pressable>
          </View>

          {/**Sign In Button*/}
          <TouchableOpacity onPress={handleSignInPress} style={styles.button}>
            <Text style={[styles.signinText, { color: "white" }]}>SIGN-IN</Text>
          </TouchableOpacity>

          {/**Forgot Password */}
          <TouchableOpacity
            onPress={() => {
              console.log("goToForgetPasswordPage!!");
            }}
          >
            <Text style={styles.text}>Forgot Username / Password ?</Text>
          </TouchableOpacity>

          {/**Don't have an account ? */}
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("register-screen");
                console.log("goToSignUpPage!!");
              }}
            >
              <Text style={[styles.text, { color: Colors.blueColor2 }]}>
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
