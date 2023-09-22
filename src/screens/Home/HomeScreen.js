import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./HomeScreen.styles";
const HomeScreen = ({ route }) => {
  const { personalData } = route.params;
  return (
    <View style={styles.container}>
      <Text>
        Welcome, {personalData.name}
      </Text>
      <Text>
        Email: {personalData.email}
      </Text>
      <Image
        source={personalData.image}
        style={{ width: "10%", height: "10%" }}
      />
    </View>
  );
};

export default HomeScreen;
