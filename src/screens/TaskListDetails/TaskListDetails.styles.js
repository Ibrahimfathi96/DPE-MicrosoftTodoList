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
  centerTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
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
    backgroundColor: "#4E599E",
    borderRadius: 8,
    width: 50,
    height: 30,
    alignContent: "center",
    justifyContent: "center",
    marginRight: 10
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    elevation: 10,
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;
