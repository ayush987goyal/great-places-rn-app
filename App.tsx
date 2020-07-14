import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import store from './src/store';
import PlacesStackScreen from './src/navigation/PlacesStackScreen';
import { init } from './src/helpers/db';

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
      <Provider store={store}>
        <PlacesStackScreen />
      </Provider>
    </NavigationContainer>
  );
}
