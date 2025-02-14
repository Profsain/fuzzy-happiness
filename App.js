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

// iap setups
import { useEffect } from "react";
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';



export default function App() {
  // Configure revenueCat
  const APIKeys = {
    apple: process.env.REVENUECAT_IOS_KEY,
    google: process.env.REVENUECAT_GOOGLE_KEY,
  };

  useEffect(() => {
    const setup = async () => {
      if (Platform.OS == "ios") {
        await Purchases.configure({ apiKey: APIKeys.apple });
      } else if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      }
      
      // test fetching product
      const offerings = await Purchases.getOfferings();
      console.log("Product", offerings);
    };
    
    // log
    setup()
      .catch(console.log);

  }, []);
  
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