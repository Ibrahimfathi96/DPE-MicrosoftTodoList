import { Alert } from "react-native";

const deleteAlert = ({ name, onPress }) => {
  Alert.alert("Are you sure?", `"${name}" will be permanently deleted.`, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Delete", onPress }
  ]);
};

export default deleteAlert;
