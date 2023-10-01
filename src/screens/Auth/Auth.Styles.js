import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../common/colors";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  mainView: {
    flexDirection: "row",
    marginHorizontal: "auto",
    marginVertical: "auto",
    height: height * 0.5,
    backgroundColor: "white",
    width: width * 0.8,
    borderRadius: 16,
    elevation: 8,
    padding: 40
  },
  wrapper: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    backgroundColor: Colors.blueColor2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 14,
    marginBottom: 20
  },
  textInputsMainView: {
    alignSelf: "baseline",
    marginTop: 14,
    width: "100%"
  },
  CheckBoxView: {
    flexDirection: "row",
    alignSelf: "baseline",
    marginTop: 14,
    width: "100%"
  },
  signinText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  text: {
    fontSize: 16,
    fontWeight: "500"
  },
  textInput: {
    borderWidth: 0.7,
    paddingLeft: 10,
    borderRadius: 4,
    marginTop: 4
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "500"
  },
  passwordRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
