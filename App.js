import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
// local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { OnboardingScreen, LoginScreen } from './screens';


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarded')
      .then(value => {
        if (value === null) {
          AsyncStorage.setItem('onboarded', 'true');
          setHasOnboarded(true);
        } else {
          setHasOnboarded(true);
        }
      });
  }, []);

  return (
      <NavigationContainer>
      <Stack.Navigator>
        {hasOnboarded && (
           <Stack.Screen options={{headerShown: false}} name="OnboardingScreen" component={OnboardingScreen} />
           )}
           
            <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}


