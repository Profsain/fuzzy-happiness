import { useEffect } from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
// firebase config
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';


export default function App() {

  useEffect(() => {
    // Initialize Firebase
    initializeApp(firebaseConfig);  
  }, []);
  
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        {/* AppStack here */}
        <AuthStack />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}


