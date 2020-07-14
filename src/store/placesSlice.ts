import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

import { Place } from '../models';
import { insertPlace } from '../helpers/db';

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
    const { insertId } = await insertPlace(payload);

    const place: Place = {
      ...payload,
      id: insertId.toString(),
      imageUri: newPath,
    };

    return place;
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
    builder.addCase(addPlace.fulfilled, (state, action) => {
      state.places.push(action.payload);
    }),
});

export default placesSlice.reducer;
