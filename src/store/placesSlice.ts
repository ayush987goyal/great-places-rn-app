import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

import { Place } from '../models';
import { insertPlace, fetchPlaces } from '../helpers/db';
import { getAddressFromCoords } from '../service/service';

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

export const addPlace = createAsyncThunk(
  'places/addPlace',
  async (payload: Omit<Place, 'id' | 'address'>) => {
    const { title, imageUri, lat, lng } = payload;

    try {
      const address = await getAddressFromCoords({ lat, lng });

      const fileName = imageUri.split('/').pop();
      const newPath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });

      const { insertId } = await insertPlace({ title, lat, lng, address, imageUri: newPath });

      const place: Place = {
        title,
        lat,
        lng,
        address,
        imageUri: newPath,
        id: insertId,
      };

      return place;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const loadPlaces = createAsyncThunk('places/loadPlaces', async () => {
  try {
    const { rows } = await fetchPlaces();

    const places: Place[] = (rows as any)._array;
    return places;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(addPlace.fulfilled, (state, action) => {
        state.places.push(action.payload);
      })
      .addCase(loadPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
      }),
});

export default placesSlice.reducer;
