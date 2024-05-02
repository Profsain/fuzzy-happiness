import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { LoginProvider } from "./context/LoginProvider";
// redux store
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <LoginProvider>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            {/* main navigation switcher */}
            <MainNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
        </LoginProvider>
    </Provider>
  );
}
