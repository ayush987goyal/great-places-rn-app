import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import store from './src/store';
import PlacesStackScreen from './src/navigation/PlacesStackScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PlacesStackScreen />
      </Provider>
    </NavigationContainer>
  );
}
