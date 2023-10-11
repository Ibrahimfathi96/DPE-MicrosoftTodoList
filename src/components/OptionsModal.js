import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import React from "react";
import OptionsModalItem from "./OptionsModalItem";

const OptionsModal = ({
  visible,
  onModalPressHandler,
  onRenameListPress,
  onChangeThemePress,
  onDeleteListPress
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onModalPressHandler}>
        <View style={styles.optionsContainer}>
          {/**Rename List */}
          <OptionsModalItem
            pressHandler={onRenameListPress}
            iconName={"edit"}
            text={"Rename List"}
          />

          {/**Change Theme*/}
          <OptionsModalItem
            pressHandler={onChangeThemePress}
            iconName={"palette-outline"}
            iconType={"material-community"}
            text={"Change Theme"}
          />

          {/**Delete List */}
          <OptionsModalItem
            pressHandler={onDeleteListPress}
            iconName={"delete"}
            iconColor="red"
            textColor="red"
            text={"Delete List"}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    alignItems: "flex-end",
    right: 10,
    top: 50,
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
});

export default OptionsModal;
