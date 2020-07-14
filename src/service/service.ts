import axios from 'axios';

import { Coords } from '../models';
import { googleApiKey } from '../Constants/env';

export function getMapPreviewImageUrl(location: Coords) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${googleApiKey}`;
}

export async function getAddressFromCoords(location: Coords): Promise<string> {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${googleApiKey}`
  );

  return data.results[0].formatted_address;
}
