import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';


export default function App() {

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        {/* AppStack here */}
        <AuthStack />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}


