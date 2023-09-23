import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const TaskListDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  console.log("ITEM:====================>", item.name);
  return (
    <View>
      <Text>
        {item.name}
      </Text>
    </View>
  );
};

export default TaskListDetails;
