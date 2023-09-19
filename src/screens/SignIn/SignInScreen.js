import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useState } from "react";
import styles from "./SignIn.Styles";
import Checkbox from "expo-checkbox";
import Colors from "../../common/colors";

const SignInScreen = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.wrapper}>
          <Text style={styles.signinText}>Login</Text>
          <View style={styles.textInputsMainView}>
            <Text>Email</Text>
            <TextInput placeholder="Enter E-mail" style={styles.textInput} />
          </View>
          <View style={styles.textInputsMainView}>
            <Text>Paswword</Text>
            <TextInput
              placeholder="Enter Paswword"
              style={styles.textInput}
              secureTextEntry
            />
          </View>
          <View style={styles.CheckBoxView}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? Colors.blueColor : undefined}
            />
            <Pressable
              onPress={() => {
                setChecked(!isChecked);
              }}
            >
              <Text style={{ marginLeft: 6 }}>Show Password</Text>
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("SignInSuccessfully!");
            }}
            style={styles.button}
          >
            <Text style={[styles.signinText, { color: "white" }]}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("goToForgetPasswordPage!!");
            }}
          >
            <Text style={styles.text}>Forgot Username / Password?</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <Text style={styles.text}>
              Don't have an account?{"  "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log("goToSignUpPage!!");
              }}
            >
              <Text style={[styles.text, { color: Colors.blueColor2 }]}>
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
