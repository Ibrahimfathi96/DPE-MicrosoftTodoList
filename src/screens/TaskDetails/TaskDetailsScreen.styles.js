import Colors from "../../common/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 10,
    paddingHorizontal: 16
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginHorizontal: 16
  },
  headerText: {
    fontSize: 20,
    color: "black",
    marginLeft: 30
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
    width: 30,
    height: 30,
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
    paddingHorizontal: 16,
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
  }
});
export default styles;
