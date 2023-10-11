import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const OptionsModalItem = ({
  pressHandler,
  iconName,
  iconType = "material",
  iconColor = "black",
  textColor = "black",
  text
}) => {
  return (
    <View style={styles.optionsContent}>
      <TouchableOpacity onPress={pressHandler}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={iconName}
            type={iconType}
            size={26}
            color={iconColor}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontWeight: "500", fontSize: 18, color: textColor }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsContent: {
    width: "60%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16
  }
});

export default OptionsModalItem;
