import { StyleSheet } from "react-native";
import Colors from "../../common/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 8
  },
  flatlistItemRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  listNameAndLength: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 30
  },
  listName: {
    fontWeight: "500",
    fontSize: 18
  },
  listLength: {
    fontWeight: "500",
    fontSize: 16,
    color: "grey"
  },
  upperFlatListView: {
    marginVertical: 20,
    marginHorizontal: 10,
    paddingBottom: 16,
    borderBottomColor: "grey",
    borderBottomWidth: 2
  },
  lowerFlatListView: {
    marginHorizontal: 10
  },
  modalView: {
    marginTop: 20,
    marginHorizontal: 20
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  accountInfo: {
    marginVertical: 20,
    paddingBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  userText: {
    fontWeight: "bold",
    fontSize: 18
  },
  emailText: {
    color: "grey",
    fontWeight: "500",
    fontSize: 16
  },
  modalRowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 16
  },
  modalRowView2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 16
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  addListButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  textInput: {
    borderWidth: 0.7,
    paddingLeft: 10,
    borderRadius: 4,
    marginTop: 4
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
  groupNameInput: {
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
  newListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 6
  },
  floatingButton: {
    position: "absolute",
    bottom: 12,
    right: 30,
    backgroundColor: Colors.blueColor,
    elevation: 10,
    width: 140,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
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
export default styles;
