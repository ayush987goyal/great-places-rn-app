import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { Coords } from '../models';
import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import Colors from '../Constants/Colors';
import MapPreview from './MapPreview';

interface LocationSelectorProps {
  onLocationPicked: (l: Coords) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<Coords>();

  const navigation = useNavigation<NavigationProp<PlacesStackScreenParamsList, 'NewPlace'>>();
  const route = useRoute<RouteProp<PlacesStackScreenParamsList, 'NewPlace'>>();
  const mapPickedLocation = route.params?.pickedLocation;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

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
      onLocationPicked({ lat: location.coords.latitude, lng: location.coords.longitude });
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

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler}>
        {isFetching ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>

      <View style={styles.actions}>
        <Button title="Get Location" color={Colors.primary} onPress={getLocationHandler} />
        <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler} />
      </View>
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
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationSelector;
