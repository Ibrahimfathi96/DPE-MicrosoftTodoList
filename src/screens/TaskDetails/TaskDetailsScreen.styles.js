import Colors from "../../common/colors";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 16
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 10
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
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
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "grey"
  },
  titleTextView: {
    paddingLeft: 20,
    flex: 1,
    flexDirection: "column"
  },
  text: {
    fontSize: 16,
    fontWeight: "500"
  }
});
export default styles;
