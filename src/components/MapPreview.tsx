import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';

import { Coords } from '../models';

import { getMapPreviewImageUrl } from '../service/service';

interface MapPreviewProps {
  style?: ViewStyle;
  location?: Coords;
  onPress?: () => void;
}

const MapPreview: React.FC<MapPreviewProps> = ({ style, location, onPress, children }) => {
  let imagePreviewUrl = '';
  if (location) {
    imagePreviewUrl = getMapPreviewImageUrl(location);
  }

  return (
    <TouchableOpacity style={{ ...styles.mapPreview, ...style }} onPress={onPress}>
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
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
