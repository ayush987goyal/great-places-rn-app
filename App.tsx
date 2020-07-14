import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import PlacesStackScreen from './src/navigation/PlacesStackScreen';

export default function App() {
  return (
    <NavigationContainer>
      <PlacesStackScreen />
    </NavigationContainer>
  );
}
