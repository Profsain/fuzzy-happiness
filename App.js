import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import registerNNPushToken from 'native-notify';
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import * as Linking from 'expo-linking';
import { LoginProvider } from "./context/LoginProvider";
// redux store
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  const linking = {
    prefixes: ['splinxplanet://'],
    config: {
      screens: {
        PaymentSuccessScreen: 'payment-success',
        // Add other screens if needed
      },
    },
  };

  // https://app.nativenotify.com/in-app token
  // for notifications service
  const token = process.env.NATIVE_NOTIFY_TOKEN;
  registerNNPushToken(22245, token);
  
  return (
    <Provider store={store}>
      <LoginProvider>
        <GluestackUIProvider config={config}>
          <NavigationContainer linking={linking}>
            {/* main navigation switcher */}
            <MainNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
        </LoginProvider>
    </Provider>
  );
}
