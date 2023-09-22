import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable
} from "react-native";
import styles from "./SignIn.Styles";
import Checkbox from "expo-checkbox";
import Colors from "../../common/colors";
import { personalData } from "../../common/PersonalData";
import {
  login,
  setError,
  togglePasswordVisibility
} from "../../redux/reducres/authSlice.js";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isShownPassword = useSelector(state => state.auth.isShownPassword);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const error = useSelector(state => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordVisibilityToggle = () => {
    dispatch(togglePasswordVisibility());
  };
  const handleSignIn = () => {
    if (!email || !password) {
      dispatch(setError("Email and password are required!!"));
    } else if (
      email === personalData.email &&
      password === personalData.password
    ) {
      dispatch(login());
      dispatch(setError(null));
      navigation.navigate("home-screen", { personalData });
    } else {
      dispatch(setError("Invalid email or password"));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.wrapper}>
          <Text style={styles.signinText}>Login</Text>
          {error &&
            <Text style={styles.errorText}>
              {error}
            </Text>}
          <View style={styles.textInputsMainView}>
            <Text style={styles.text}>Email :</Text>
            <TextInput
              placeholder="Enter E-mail"
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.textInputsMainView}>
            <Text style={styles.text}>Password :</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.textInput}
              secureTextEntry={!isShownPassword}
              onChangeText={text => setPassword(text)}
            />
          </View>
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
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={[styles.signinText, { color: "white" }]}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("goToForgetPasswordPage!!");
            }}
          >
            <Text style={styles.text}>Forgot Username / Password ?</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <Text style={styles.text}>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => {
                console.log("goToSignUpPage!!");
              }}
            >
              <Text style={[styles.text, { color: Colors.blueColor2 }]}>
                {" "}Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
