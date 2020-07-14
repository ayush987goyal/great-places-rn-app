import React, { useLayoutEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import Colors from '../Constants/Colors';
import MapPreview from '../components/MapPreview';
import { Coords } from '../models';

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

  const selectedLocation: Coords = { lat: place.lat, lng: place.lng };

  const showMapHandler = () => {
    navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />

      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>

        <MapPreview
          location={selectedLocation}
          style={styles.mapPreview}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailsScreen;
