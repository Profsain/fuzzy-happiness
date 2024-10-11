import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import registerNNPushToken from 'native-notify';
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { LoginProvider } from "./context/LoginProvider";
// redux store
import store from "./store";
import { Provider } from "react-redux";
import { Text } from "react-native";

export default function App() {
  const token = process.env.NATIVE_NOTIFY_TOKEN;
  registerNNPushToken(22245, token);
  
  return (
    <Provider store={store}>
      <LoginProvider>
        <Text>Hello World</Text>
        </LoginProvider>
    </Provider>
  );
}
