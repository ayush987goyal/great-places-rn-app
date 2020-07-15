import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { init } from './src/service/db';
import PlacesStackScreen from './src/navigation/PlacesStackScreen';

init()
  .then(() => {
    console.log('Initialized DB');
  })
  .catch(err => {
    console.log('Init db failed', err);
  });

export default function App() {
  return (
    <NavigationContainer>
      <PlacesStackScreen />
    </NavigationContainer>
  );
}
