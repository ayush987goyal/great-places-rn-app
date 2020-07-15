import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useFocusEffect } from '@react-navigation/native';

import { getAllPlaces } from './service';

export const FETCH_PLACES_KEY = 'fetchPlaces';

export function useRefetchOnFocus(refetch: () => void) {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
}

export function usePlaces() {
  return useQuery(FETCH_PLACES_KEY, getAllPlaces);
}
