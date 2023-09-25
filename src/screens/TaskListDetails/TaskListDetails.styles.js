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
    paddingHorizontal: 10
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
  }
});
export default styles;
