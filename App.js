import React, { useEffect, useState } from 'react';
// local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';

export default function App() {

  return (
      <NavigationContainer>
        {/* AppStack here */}
        <AuthStack />
      </NavigationContainer>
  );
}


