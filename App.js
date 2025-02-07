import "./global.css"
// polyfill for intl
import '@formatjs/intl';

import { registerRootComponent } from 'expo';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import registerNNPushToken from 'native-notify';
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { LoginProvider } from "./context/LoginProvider";
// redux store
import store from "./store";
import { Provider } from "react-redux";

// adaptY IAP INTEGRATION
import { adapty } from 'react-native-adapty';

adapty.activate('public_live_a8XKKXOL.fuL3WwVYXFjXhIBeTtfh');


export default function App() {
  const token = process.env.NATIVE_NOTIFY_TOKEN;
  registerNNPushToken(22245, token);
  
  return (
    <Provider store={store}>
      <LoginProvider>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
        </LoginProvider>
    </Provider>
  );
}


registerRootComponent(App);