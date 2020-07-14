import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { Region, MapEvent, Marker, LatLng } from 'react-native-maps';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import Colors from '../Constants/Colors';

const mapRegion: Region = {
  latitude: 37.78,
  longitude: -122.43,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

interface MapScreenScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'Map'>;
}

const MapScreen: React.FC<MapScreenScreenProps> = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng>();

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) return;

    navigation.navigate('NewPlace', {
      pickedLocation: { lat: selectedLocation.latitude, lng: selectedLocation.longitude },
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  const selectLocationHandler = useCallback((event: MapEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  }, []);

  return (
    <MapView region={mapRegion} style={styles.map} onPress={selectLocationHandler}>
      {selectedLocation && <Marker title="Picked Location" coordinate={selectedLocation} />}
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
