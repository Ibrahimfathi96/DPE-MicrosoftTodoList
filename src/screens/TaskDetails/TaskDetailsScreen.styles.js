import Colors from "../../common/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 16
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#D3D3D3"
  },
  headerText: {
    fontSize: 20,
    color: "black",
    marginLeft: 12
  },
  doneTaskcard: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blueColor
  },
  notDoneTaskCard: {
    width: 25,
    height: 25,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "grey"
  },
  titleTextView: {
    paddingLeft: 20,
    flex: 1,
    flexDirection: "column"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  addDesc: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 20,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#D3D3D3"
  },
  descView: {
    height: 200,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#D3D3D3",
    borderRadius: 8,
    padding: 8
  },
  submitButton: {
    flexDirection: "row",
    marginLeft: "70%",
    marginTop: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center"
  },
  submitText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18
  },
  deleteButton: {
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "red",
    borderRadius: 10
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
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
  textInput: {
    borderBottomWidth: 3,
    borderColor: Colors.blueColor,
    paddingVertical: 4,
    marginHorizontal: 12,
    marginBottom: 30,
    fontSize: 18
  },
  modalButtonsView: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modalButton: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
    color: "black"
  }
});
export default styles;
