import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import React, { useState } from "react";
import styles from "./Auth.Styles";
import Checkbox from "expo-checkbox";
import Colors from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../../redux/API/ApiServices";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isShownPassword, setIsShownPassword] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordVisibilityToggle = () => {
    setIsShownPassword(!isShownPassword);
  };

  const handleSignUp = async () => {
    try {
      const user = await signUp(name, email, password);
      if (user) {
        ToastAndroid.showWithGravity(
          "Registration Success\nGo Sign-In with the same Credentials.",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setError(null);
        setTimeout(() => {
          navigation.navigate("sign-in-screen");
        }, 2000);
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Registration Error\nRegistration failed. Please try again.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error + "\n" + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.wrapper}>
          <Text style={styles.signinText}>REGISTER</Text>

          {/**UserName Text Fields*/}
          <View style={styles.textInputsMainView}>
            <Text style={styles.text}>UserName :</Text>
            <TextInput
              placeholder="Enter Your UserName"
              style={styles.textInput}
              onChangeText={text => {
                setName(text);
                setError(null);
              }}
            />

            {/**Email Text Fields*/}
            <View style={styles.textInputsMainView}>
              <Text style={styles.text}>Email :</Text>
              <TextInput
                placeholder="Enter E-mail"
                style={styles.textInput}
                onChangeText={text => {
                  setEmail(text);
                  setError(null);
                }}
              />
            </View>

            {/**Password Text Fields*/}
            <View style={styles.textInputsMainView}>
              <Text style={styles.text}>Password :</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  placeholder="Enter Password"
                  style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                  secureTextEntry={!isShownPassword}
                  onChangeText={text => {
                    setPassword(text);
                    setError(null);
                  }}
                />
                <Checkbox
                  value={isShownPassword}
                  onValueChange={handlePasswordVisibilityToggle}
                  color={isShownPassword ? Colors.blueColor : undefined}
                />
              </View>
            </View>

            {/**Sign UP Button*/}
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={[styles.signinText, { color: "white" }]}>
                SIGN-UP
              </Text>
            </TouchableOpacity>

            {/**already have an account ? */}
            <View
              style={{
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.text}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("sign-in-screen");
                  console.log("goToSignInPage!!");
                }}
              >
                <Text style={[styles.text, { color: Colors.blueColor2 }]}>
                  {" "}Sign-In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
