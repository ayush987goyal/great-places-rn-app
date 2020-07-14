import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Place } from '../models';

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<Omit<Place, 'id'>>) => {
      state.places.push({
        id: new Date().toISOString(),
        ...action.payload,
      });
    },
  },
});

export const { addPlace } = placesSlice.actions;

export default placesSlice.reducer;
