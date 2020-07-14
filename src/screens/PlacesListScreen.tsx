import React, { useLayoutEffect, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { PlacesStackScreenParamsList } from '../navigation/PlacesStackScreen';
import { RootState } from '../store';
import { loadPlaces } from '../store/placesSlice';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

interface PlacesListScreenProps {
  navigation: StackNavigationProp<PlacesStackScreenParamsList, 'Places'>;
}

const PlacesListScreen: React.FC<PlacesListScreenProps> = ({ navigation }) => {
  const places = useSelector((state: RootState) => state.places.places);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <PlaceItem
          place={itemData.item}
          onSelect={() => navigation.navigate('PlaceDetail', { place: itemData.item })}
        />
      )}
    />
  );
};

export default PlacesListScreen;
