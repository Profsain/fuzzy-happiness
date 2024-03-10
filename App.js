import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import MainNavigator from './navigation/MainNavigator';
import { LoginProvider } from './context/LoginProvider';


export default function App() {

  return (
    <LoginProvider>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          {/* main navigation switcher */}
          <MainNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </LoginProvider>
  );
}


