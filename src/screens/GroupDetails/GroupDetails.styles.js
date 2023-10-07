import { StyleSheet } from "react-native";
import Colors from "../../common/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D70BD",
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
    marginLeft: 10
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
    paddingVertical: 30,
    borderRadius: 2
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
    marginBottom: 30,
    fontSize: 18
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end"
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
  }
});
export default styles;
