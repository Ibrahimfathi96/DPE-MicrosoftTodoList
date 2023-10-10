import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Colors from "../common/colors";
import { Icon } from "react-native-elements";
const ColorList = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const colorArray = Object.values(Colors);

  const renderItem = ({ item }) => {
    const isColorSelected = selectedColor === item;
    const iconColor = isColorSelected && item === "#fff" ? "black" : "white";
    return (
      <View
        style={[
          styles.colorCircle,
          { backgroundColor: item },
          isColorSelected && styles.selectedColorCircle
        ]}
        onTouchStart={() => setSelectedColor(item)}
      >
        {isColorSelected && (
          <View style={styles.iconContainer}>
            <Icon name="done" type="material" color={iconColor} size={30} />
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={colorArray}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    position: "relative"
  },
  selectedColorCircle: {
    borderWidth: 3,
    borderColor: "black"
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  iconText: {
    color: "white",
    fontSize: 20
  }
});

export default ColorList;
