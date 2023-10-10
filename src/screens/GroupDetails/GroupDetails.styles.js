import { StyleSheet } from "react-native";
import Colors from "../../common/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT,
    alignItems: "center",
    paddingHorizontal: 10
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  titleAndBackIcon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 4
  },
  inputText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 4,
    borderWidth: 1,
    padding: 4,
    borderColor: "darkgrey"
  },
  separatorText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 16
  },
  separatorNum: {
    color: "white",
    fontWeight: "600",
    fontSize: 14
  },
  iconView: {
    backgroundColor: "#3E4883",
    borderRadius: 8,
    width: 50,
    height: 30,
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 10,
    elevation: 10
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#3E4883",
    elevation: 10,
    width: 140,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
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
  taskNameInput: {
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
  addTaskButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  newTaskText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 6
  },
  optionsContainer: {
    flex: 1,
    alignItems: "flex-end",
    right: 10,
    top: 50,
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  optionsContent: {
    width: "60%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16
  },
});
export default styles;
