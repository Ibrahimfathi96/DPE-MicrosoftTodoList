import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./Auth.Styles";
import Checkbox from "expo-checkbox";
import Colors from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShownPassword, setIsShownPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setIsShownPassword(!isShownPassword);
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
              onChangeText={text => setUserName(text)}
            />

            {/**Email Text Fields*/}
            <View style={styles.textInputsMainView}>
              <Text style={styles.text}>Email :</Text>
              <TextInput
                placeholder="Enter E-mail"
                style={styles.textInput}
                onChangeText={text => setEmail(text)}
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
                  onChangeText={text => setPassword(text)}
                />
                <Checkbox
                  value={isShownPassword}
                  onValueChange={handlePasswordVisibilityToggle}
                  color={isShownPassword ? Colors.blueColor : undefined}
                />
              </View>
            </View>

            {/**Sign UP Button*/}
            <TouchableOpacity
              onPress={() => {
                console.log("SignUp Successfully");
              }}
              style={styles.button}
            >
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
