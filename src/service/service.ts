import axios from 'axios';
import * as FileSystem from 'expo-file-system';

import { Coords, Place } from '../models';
import { googleApiKey } from '../Constants/env';
import { insertPlace, fetchPlaces } from './db';

export function getMapPreviewImageUrl(location: Coords) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${googleApiKey}`;
}

async function getAddressFromCoords(location: Coords): Promise<string> {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${googleApiKey}`
  );

  return data.results[0].formatted_address;
}

async function saveImageToFS(uri: string) {
  const fileName = uri.split('/').pop();
  const newPath = `${FileSystem.documentDirectory}${fileName}`;

  await FileSystem.moveAsync({ from: uri, to: newPath });

  return newPath;
}

export async function savePlaceToDb(placeData: Omit<Place, 'id' | 'address'>) {
  const { title, imageUri, lat, lng } = placeData;

  const address = await getAddressFromCoords({ lat, lng });
  const newPath = await saveImageToFS(imageUri);
  const { insertId } = await insertPlace({ title, lat, lng, address, imageUri: newPath });

  return insertId;
}

export async function getAllPlaces() {
  const { rows } = await fetchPlaces();

  const places: Place[] = (rows as any)._array;
  return places;
}
