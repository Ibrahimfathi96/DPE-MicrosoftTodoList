import { StyleSheet } from "react-native";

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

});
export default styles;
