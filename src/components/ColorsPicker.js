import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Colors from "../common/colors";
import { Icon } from "react-native-elements";

const ColorList = ({ onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(Colors.DEFAULT);
  const colorArray = Object.values(Colors);

  const handleColorSelect = (color) => {
    console.log("color", color);
    setSelectedColor(color);
    onColorSelect(color);
  };

  const renderItem = ({ item }) => {
    const isColorSelected = selectedColor === item;

    return (
      <View
        style={[
          styles.colorCircle,
          { backgroundColor: item },
          isColorSelected && styles.selectedColorCircle
        ]}
        onTouchStart={() => handleColorSelect(item)}
      >
        {isColorSelected && (
          <View style={styles.iconContainer}>
            <Icon name="done" type="material" color="white" size={30} />
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={colorArray}
      horizontal
      showsHorizontalScrollIndicator={false}
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
    color: "black",
    fontSize: 20
  }
});

export default ColorList;
