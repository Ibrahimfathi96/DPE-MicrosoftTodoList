import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import Colors from "./src/common/colors";
import RouteNavigation from "./src/Navigation/RouteNavigation";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="default" backgroundColor={Colors.blueColor} />
      <RouteNavigation />
    </Provider>
  );
}
