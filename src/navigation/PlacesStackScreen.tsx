import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../Constants/Colors';

const PlacesStack = createStackNavigator();

const PlacesStackScreen = () => (
  <PlacesStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    }}
  >
    <PlacesStack.Screen
      name="Places"
      component={PlacesListScreen}
      options={{ headerTitle: 'All Places' }}
    />
    <PlacesStack.Screen name="PlaceDetail" component={PlaceDetailsScreen} />
    <PlacesStack.Screen
      name="NewPlace"
      component={NewPlaceScreen}
      options={{ headerTitle: 'Add Place' }}
    />
    <PlacesStack.Screen name="Map" component={MapScreen} />
  </PlacesStack.Navigator>
);

export type PlacesStackScreenParamsList = {
  Places: undefined;
  PlaceDetail: undefined;
  NewPlace: undefined;
  Map: undefined;
};

export default PlacesStackScreen;
