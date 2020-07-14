import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

import { Place } from '../models';
import { insertPlace, fetchPlaces } from '../helpers/db';

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

export const addPlace = createAsyncThunk('places/addPlace', async (payload: Omit<Place, 'id'>) => {
  const fileName = payload.imageUri.split('/').pop();
  const newPath = `${FileSystem.documentDirectory}${fileName}`;

  try {
    await FileSystem.moveAsync({
      from: payload.imageUri,
      to: newPath,
    });
    payload.imageUri = newPath;
    const { insertId } = await insertPlace(payload);

    const place: Place = { ...payload, id: insertId };

    return place;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

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
