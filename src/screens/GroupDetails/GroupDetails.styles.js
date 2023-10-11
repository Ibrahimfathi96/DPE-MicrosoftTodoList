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
  separatorView: {
    marginVertical: 20,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  insideView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.35)"
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
  }
});
export default styles;
