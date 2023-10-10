import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import Icons from "../common/icons";
import Colors from "../common/colors";

const IconsPicker = ({ onIconSelect }) => {
  const [selectedIcon, setSelectedIcon] = useState(Icons.TOC.iconName);
  const IconArray = Object.values(Icons);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon.iconName);
    onIconSelect(icon.iconName);
  };

  const renderItem = ({ item }) => {
    const isIconSelected = selectedIcon === item.iconName;
    return (
      <View
        style={[
          styles.iconContainer,
          isIconSelected && styles.selectedIconContainer
        ]}
        onTouchStart={() => handleIconSelect(item)}
      >
        <Icon
          name={item.iconName}
          color={item.iconColor}
          size={34}
          style={{ padding: 1 }}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={IconArray}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.iconName}
      renderItem={renderItem}
      contentContainerStyle={styles.iconList}
    />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "transparent",
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 6,
    marginVertical: 10
  },
  selectedIconContainer: {
    borderColor: Colors.BLUE,
    justifyContent: "center",
    alignItems: "center"
  },
  iconList: {
    marginHorizontal: 6
  }
});

export default IconsPicker;
