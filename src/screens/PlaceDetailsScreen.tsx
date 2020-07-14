import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';

interface PlaceDetailsScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'PlaceDetail'>;
  route: RouteProp<PlacesStackScreenParamsList, 'PlaceDetail'>;
}

const PlaceDetailsScreen: React.FC<PlaceDetailsScreenProps> = ({ route, navigation }) => {
  const { place } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: place.title,
    });
  }, [navigation, place.title]);

  return (
    <View>
      <Text>{place.title}</Text>
    </View>
  );
};

export default PlaceDetailsScreen;
