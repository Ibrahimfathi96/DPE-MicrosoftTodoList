import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput
} from "react-native";
import Colors from "../common/colors";
import IconsPicker from "./IconsPicker";
import ColorList from "./ColorsPicker";

const CreateModal = ({
  visible,
  modalTitle,
  placeholder,
  onChangeTextHandler,
  value,
  nagativeActionHandler,
  positiveActionHandler,
  positiveActionText,
  disabled,
  isGroupModal,
  setSelectedColor,
  selectedView,
  setSelectedView,
  colorPickerVisible,
  setColorPickerVisible,
  iconPickerVisible,
  setIconPickerVisible,
  handleIconSelection
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>

          <TextInput
            placeholder={placeholder}
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={onChangeTextHandler}
            value={value}
          />

          {isGroupModal && (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setColorPickerVisible(!colorPickerVisible);
                  setIconPickerVisible(false);
                  setSelectedView("color");
                }}
              >
                <View
                  style={[
                    styles.chooseIconOrColor,
                    {
                      backgroundColor:
                        selectedView === "color"
                          ? Colors.blueColor
                          : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={{
                      color: selectedView === "color" ? "white" : "black"
                    }}
                  >
                    COLOR
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIconPickerVisible(!iconPickerVisible);
                  setColorPickerVisible(false);
                  setSelectedView("icon");
                }}
              >
                <View
                  style={[
                    styles.chooseIconOrColor,
                    {
                      backgroundColor:
                        selectedView === "icon"
                          ? Colors.blueColor
                          : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={{
                      color: selectedView === "icon" ? "white" : "black"
                    }}
                  >
                    ICON
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {iconPickerVisible && (
            <IconsPicker onIconSelect={handleIconSelection} />
          )}

          {colorPickerVisible && <ColorList onColorSelect={setSelectedColor} />}

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={nagativeActionHandler}>
              <Text style={styles.modalButton}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={positiveActionHandler}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.modalButton,
                  { color: value ? Colors.blueColor : "#DBDBDB" }
                ]}
              >
                {positiveActionText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderRadius: 6
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16
  },
  textInput: {
    borderBottomWidth: 3,
    borderColor: Colors.blueColor,
    paddingVertical: 4,
    marginHorizontal: 12,
    marginBottom: 10,
    fontSize: 18
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  modalButton: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
    color: "black"
  },
  chooseIconOrColor: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderColor: Colors.blueColor,
    borderRadius: 16,
    marginLeft: 10,
    marginVertical: 4
  }
});
