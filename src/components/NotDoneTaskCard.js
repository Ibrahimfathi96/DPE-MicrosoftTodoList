import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

export default function NotDoneTaskCard({ taskTitle, taskDesc, listName }) {
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
      {/* <RoundCheckbox
        size={26}
        checked={false}
        onValueChange={newValue => {
          console.log(newValue);
        }}
      /> */}
      <View
        style={{
          width: 25,
          height: 25,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: "grey"
        }}
      />
      <View
        style={{
          paddingLeft: 20,
          flex: 1,
          flexDirection: "column"
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
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
