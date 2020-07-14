import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MapView, { Region, MapEvent, Marker } from 'react-native-maps';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import Colors from '../Constants/Colors';
import { Coords } from '../models';

interface MapScreenScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'Map'>;
  route: RouteProp<PlacesStackScreenParamsList, 'Map'>;
}

const MapScreen: React.FC<MapScreenScreenProps> = ({ navigation, route }) => {
  const { readonly, initialLocation } = route.params;

  const [selectedLocation, setSelectedLocation] = useState<Coords | undefined>(initialLocation);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return;

    navigation.navigate('NewPlace', {
      pickedLocation: selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !readonly && (
          <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation, readonly, savePickedLocationHandler]);

  const selectLocationHandler = useCallback(
    (event: MapEvent) => {
      if (readonly) return;

      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedLocation({ lat: latitude, lng: longitude });
    },
    [readonly]
  );

  const mapRegion: Region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView region={mapRegion} style={styles.map} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

export default MapScreen;
