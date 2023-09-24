import React from "react";
import { Icon } from "react-native-elements";
import { Text, View } from "react-native";
import Colors from "../common/colors";

export default function DoneTaskCard({
  taskTitle,
  taskDesc,
  listName,
  iconName
}) {
  return (
    <View
      style={{
        width: "100%",
        height: 70,
        flexDirection: "row",
        marginVertical: 2,
        backgroundColor: "white",
        borderRadius: 6,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.blueColor
        }}
      >
        <Icon name="check" size={20} color="white" />
      </View>

      <View
        style={{
          paddingLeft: 20,
          flex: 1,
          flexDirection: "column"
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            textDecorationLine: "line-through"
          }}
        >
          {taskTitle}
        </Text>
        {listName == "Tasks" &&
          <View style={{ flexDirection: "row", marginHorizontal: 4 }}>
            <Icon name={iconName} size={18} />
            <Text>
              {listName}
            </Text>
          </View>}
      </View>
      <Icon name="star-outline" size={26} />
    </View>
  );
}
