import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from '../Constants/Colors';
import { Coords } from '../models';
import MapPreview from './MapPreview';

interface LocationSelectorProps {}

const LocationSelector: React.FC<LocationSelectorProps> = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<Coords>();

  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== Permissions.PermissionStatus.GRANTED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    } catch (err) {
      Alert.alert(
        'Failed to fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>

      <Button title="Get Location" color={Colors.primary} onPress={getLocationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationSelector;
