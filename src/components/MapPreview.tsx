import React from 'react';
import { StyleSheet, View, Image, ViewStyle } from 'react-native';

import { Coords } from '../models';
import { googleApiKey } from '../Constants/env';

interface MapPreviewProps {
  style?: ViewStyle;
  location?: Coords;
}

const MapPreview: React.FC<MapPreviewProps> = ({ style, location, children }) => {
  let imagePreviewUrl = '';
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...style }}>
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
