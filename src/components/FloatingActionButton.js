import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const FloatingActionButton = ({ onPressHandler, iconName, text }) => {
  return (
    <View style={styles.floatingButton}>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={styles.addButton}>
          <Icon name={iconName} type="material" color="white" size={26} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 30,
    backgroundColor: "#3E4883",
    elevation: 10,
    width: 140,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8
  }
});
